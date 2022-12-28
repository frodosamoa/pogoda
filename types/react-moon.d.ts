declare module "react-moon" {
  interface MoonProps {
    phase: number;
    size: number;
    border: string;
    lightColor: string;
    darkColor: string;
  }

  export default class Moon extends React.Component<MoonProps> {}
}
