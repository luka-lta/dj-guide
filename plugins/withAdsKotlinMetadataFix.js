const { withProjectBuildGradle } = require('@expo/config-plugins');

const MARKER = '// withAdsKotlinMetadataFix';

const SNIPPET = `
${MARKER}
subprojects { subproject ->
  if (subproject.name == 'react-native-google-mobile-ads') {
    subproject.tasks.withType(org.jetbrains.kotlin.gradle.tasks.KotlinCompile).configureEach {
      compilerOptions.freeCompilerArgs.add('-Xskip-metadata-version-check')
    }
  }
}
`;

/**
 * play-services-ads 25.4 ships Kotlin 2.3 metadata, while React Native 0.86 compiles with Kotlin 2.1,
 * which fails the Android build. react-native-google-mobile-ads only uses the Ads Java API, so skipping
 * the metadata version check for that one module is safe. Remove once the project compiles with Kotlin 2.3.
 */
module.exports = function withAdsKotlinMetadataFix(config) {
  return withProjectBuildGradle(config, (config) => {
    if (config.modResults.contents.includes(MARKER)) return config;
    config.modResults.contents += SNIPPET;
    return config;
  });
};
