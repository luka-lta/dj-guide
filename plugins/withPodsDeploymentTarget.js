const { withDangerousMod } = require('@expo/config-plugins');
const fs = require('fs');
const path = require('path');

/** Minimum iOS version accepted by current Xcode for every pod target. */
const MIN_IOS_DEPLOYMENT_TARGET = '15.1';
const MARKER = '# withPodsDeploymentTarget';

const SNIPPET = `
    ${MARKER}
    installer.pods_project.targets.each do |target|
      target.build_configurations.each do |build_config|
        current = build_config.build_settings['IPHONEOS_DEPLOYMENT_TARGET']
        next if current && Gem::Version.new(current) >= Gem::Version.new('${MIN_IOS_DEPLOYMENT_TARGET}')
        build_config.build_settings['IPHONEOS_DEPLOYMENT_TARGET'] = '${MIN_IOS_DEPLOYMENT_TARGET}'
      end
    end
`;

/**
 * Raises the deployment target of all pods that still declare an older iOS version
 * (e.g. 9.0, 12.0), which newer Xcode versions reject as build errors.
 */
module.exports = function withPodsDeploymentTarget(config) {
  return withDangerousMod(config, [
    'ios',
    async (config) => {
      const podfilePath = path.join(config.modRequest.platformProjectRoot, 'Podfile');
      const contents = fs.readFileSync(podfilePath, 'utf8');
      if (contents.includes(MARKER)) return config;

      const anchor = 'post_install do |installer|';
      if (!contents.includes(anchor)) {
        throw new Error('withPodsDeploymentTarget: post_install block not found in Podfile');
      }
      fs.writeFileSync(podfilePath, contents.replace(anchor, anchor + SNIPPET));
      return config;
    },
  ]);
};
