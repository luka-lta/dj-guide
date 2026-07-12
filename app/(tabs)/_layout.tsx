import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { COLORS } from '../../src/theme/colors';

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

const SCREENS: {
  name: string;
  title: string;
  label: string;
  icon: IoniconName;
  iconActive: IoniconName;
}[] = [
  { name: 'pult', title: 'Pult-Erklärung', label: 'Pult', icon: 'radio-outline', iconActive: 'radio' },
  { name: 'rekordbox', title: 'rekordbox Anleitung', label: 'rekordbox', icon: 'disc-outline', iconActive: 'disc' },
  { name: 'grundlagen', title: 'Grundlagen & Mixing', label: 'Grundlagen', icon: 'musical-notes-outline', iconActive: 'musical-notes' },
  { name: 'troubleshoot', title: 'Problemlösung', label: 'Probleme', icon: 'construct-outline', iconActive: 'construct' },
];

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.bg2,
          shadowColor: 'transparent',
          borderBottomWidth: 0,
        },
        headerTintColor: COLORS.text,
        headerTitleStyle: {
          fontWeight: '700',
          fontSize: 17,
          letterSpacing: 0.2,
        },
        headerShadowVisible: false,
        tabBarStyle: {
          backgroundColor: COLORS.bg2,
          borderTopColor: COLORS.line,
          borderTopWidth: 1,
          paddingTop: 4,
        },
        tabBarActiveTintColor: COLORS.cyan,
        tabBarInactiveTintColor: COLORS.muted,
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600',
          letterSpacing: 0.2,
          marginBottom: 2,
        },
      }}
    >
      {SCREENS.map(s => (
        <Tabs.Screen
          key={s.name}
          name={s.name}
          options={{
            title: s.title,
            tabBarLabel: s.label,
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons name={focused ? s.iconActive : s.icon} size={size} color={color} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
