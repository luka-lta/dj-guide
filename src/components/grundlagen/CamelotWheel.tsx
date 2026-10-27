import React from 'react';
import { View } from 'react-native';
import { Circle, G, Svg, Text as SvgText } from 'react-native-svg';
import { CHIP_RADIUS, RING_RADIUS, WHEEL_CHIPS, WHEEL_SIZE } from '../../data/camelot';
import { COLORS } from '../../theme/colors';

const CX = WHEEL_SIZE / 2.0;
const CY = WHEEL_SIZE / 2.0;

export function CamelotWheel() {
  return (
    <View style={{ alignItems: 'center', marginVertical: 20 }}>
      <Svg width={WHEEL_SIZE} height={WHEEL_SIZE}>
        <Circle
          cx={CX}
          cy={CY}
          r={RING_RADIUS}
          stroke={COLORS.border}
          strokeWidth={1}
          fill="none"
        />
        {WHEEL_CHIPS.map(chip => (
          <G key={chip.label} transform={`translate(${chip.x}, ${chip.y})`}>
            <Circle
              r={CHIP_RADIUS}
              fill={chip.isMajor ? COLORS.amberMuted : COLORS.surfaceRaised}
              stroke={chip.isMajor ? COLORS.amber : COLORS.borderStrong}
              strokeWidth={1}
            />
            <SvgText
              textAnchor="middle"
              alignmentBaseline="central"
              fill={chip.isMajor ? COLORS.amber : COLORS.textMuted}
              fontSize={11}
              fontWeight="700"
            >
              {chip.label}
            </SvgText>
          </G>
        ))}
        <SvgText
          x={CX}
          y={CY - 7}
          textAnchor="middle"
          alignmentBaseline="central"
          fill={COLORS.textFaint}
          fontSize={10}
        >
          Camelot
        </SvgText>
        <SvgText
          x={CX}
          y={CY + 7}
          textAnchor="middle"
          alignmentBaseline="central"
          fill={COLORS.textFaint}
          fontSize={10}
        >
          Wheel
        </SvgText>
      </Svg>
    </View>
  );
}
