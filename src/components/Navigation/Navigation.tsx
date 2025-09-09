import { styled } from "@mui/system";
import { Tabs } from "@mui/base/Tabs";
import { TabsList as BaseTabsList } from "@mui/base/TabsList";
import { buttonClasses } from "@mui/base/Button";
import { Tab as BaseTab, tabClasses } from "@mui/base/Tab";

interface NavigationProps {
  onTabChange: (value: string) => void;
}

export default function Navigation({ onTabChange }: NavigationProps) {
  const handleTabChange = (
    _event: React.SyntheticEvent | null,
    newValue: number | null
  ) => {
    const rooms = ["Todos", "Auditorio", "Sala 2-4", "Sala 2-5", "Bienestar"];
    if (newValue !== null) {
      onTabChange(rooms[newValue]);
    }
  };

  return (
    <Tabs
      defaultValue={0}
      onChange={(event, newValue) => handleTabChange(event, newValue as number)}
    >
      <TabsList>
        <Tab value={0}>Todo</Tab>
        <Tab value={1}>Auditorio</Tab>
        <Tab value={3}>Sala 1</Tab>
        <Tab value={4}>Sala 2</Tab>
        <Tab value={5}>Bienestar</Tab>
      </TabsList>
    </Tabs>
  );
}

// Estilos para Tabs y Tab
const blue = {
  50: "#F0F7FF",
  100: "#C2E0FF",
  200: "#80BFFF",
  300: "#66B2FF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0059B2",
  800: "#004C99",
  900: "#003A75",
  1000: "#fff",
  1001: "#d7723f",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const Tab = styled(BaseTab)`
  font-family: "IBM Plex Sans", sans-serif;
  color: #000;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 600;
  background-color: transparent;
  width: 100%;
  padding: 10px 12px;
  margin: 6px;
  border: none;
  border-radius: 7px;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: ${blue[1001]};
  }

  &:focus {
    color: #fff;
    outline: 3px solid ${blue[1001]};
  }

  &.${tabClasses.selected} {
    background-color: #fff;
    color: ${blue[1001]};
  }

  &.${buttonClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TabsList = styled(BaseTabsList)(
  ({ theme }) => `
  background-color: ${blue[1000]};
  border-radius: 12px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  place-content: space-between center;
  box-shadow: 0 4px 30px ${theme.palette.mode === "dark" ? grey[900] : grey[200]};
  `
);
