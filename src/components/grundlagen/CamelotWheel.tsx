import React from 'react';
import { View } from 'react-native';
import { Circle, G, Svg, Text as SvgText } from 'react-native-svg';
import { CHIP_RADIUS, RING_RADIUS, WHEEL_CHIPS, WHEEL_SIZE } from '../../data/camelot';
import type { WheelChip } from '../../data/camelot';
import { COLORS } from '../../theme/colors';

const CX = WHEEL_SIZE / 2.0;
const CY = WHEEL_SIZE / 2.0;

interface CamelotWheelProps {
  selectedLabel?: string | null;
  matchLabels?: ReadonlySet<string>;
  onSelectChip?: (chip: WheelChip) => void;
}

function toChipColors(chip: WheelChip, selectedLabel?: string | null, matchLabels?: ReadonlySet<string>) {
  if (selectedLabel === chip.label) return { fill: COLORS.amber, stroke: COLORS.amber, text: COLORS.onAmber };
  if (matchLabels?.has(chip.label)) return { fill: COLORS.amberMuted, stroke: COLORS.amber, text: COLORS.amber };
  if (selectedLabel) return { fill: COLORS.surface, stroke: COLORS.border, text: COLORS.textFaint };
  if (chip.isMajor) return { fill: COLORS.amberMuted, stroke: COLORS.amber, text: COLORS.amber };
  return { fill: COLORS.surfaceRaised, stroke: COLORS.borderStrong, text: COLORS.textMuted };
}

export function CamelotWheel({ selectedLabel, matchLabels, onSelectChip }: CamelotWheelProps) {
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
        {WHEEL_CHIPS.map(chip => {
          const colors = toChipColors(chip, selectedLabel, matchLabels);
          return (
            <G
              key={chip.label}
              transform={`translate(${chip.x}, ${chip.y})`}
              onPress={onSelectChip ? () => onSelectChip(chip) : undefined}
            >
              <Circle r={CHIP_RADIUS} fill={colors.fill} stroke={colors.stroke} strokeWidth={1} />
              <SvgText
                textAnchor="middle"
                alignmentBaseline="central"
                fill={colors.text}
                fontSize={11}
                fontWeight="700"
              >
                {chip.label}
              </SvgText>
            </G>
          );
        })}
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
