import React from 'react';
import { View } from 'react-native';
import { Circle, G, Svg, Text as SvgText } from 'react-native-svg';
import { CHIP_RADIUS, RING_RADIUS, WHEEL_CHIPS, WHEEL_SIZE } from '../../data/camelot';
import { COLORS } from '../../theme/colors';

const CX = WHEEL_SIZE / 2.0;
const CY = WHEEL_SIZE / 2.0;

const MAJOR_FILL = 'rgba(63,224,232,0.14)';
const MINOR_FILL = 'rgba(255,62,196,0.14)';

export function CamelotWheel() {
  return (
    <View style={{ alignItems: 'center', marginVertical: 20 }}>
      <Svg width={WHEEL_SIZE} height={WHEEL_SIZE}>
        <Circle
          cx={CX}
          cy={CY}
          r={RING_RADIUS}
          stroke={COLORS.line}
          strokeWidth={1}
          fill="none"
        />
        {WHEEL_CHIPS.map(chip => (
          <G key={chip.label} transform={`translate(${chip.x}, ${chip.y})`}>
            <Circle
              r={CHIP_RADIUS}
              fill={chip.isMajor ? MAJOR_FILL : MINOR_FILL}
              stroke={COLORS.line}
              strokeWidth={1}
            />
            <SvgText
              textAnchor="middle"
              alignmentBaseline="central"
              fill={chip.isMajor ? COLORS.cyan : COLORS.magenta}
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
          fill={COLORS.muted}
          fontSize={10}
        >
          Camelot
        </SvgText>
        <SvgText
          x={CX}
          y={CY + 7}
          textAnchor="middle"
          alignmentBaseline="central"
          fill={COLORS.muted}
          fontSize={10}
        >
          Wheel
        </SvgText>
      </Svg>
    </View>
  );
}
