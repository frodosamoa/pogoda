import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    theme: Theme;
    units: { [K in Sizes]: number };
    themes: { [K in Theme]: string };
    fontSizes: { [size: number]: string };
    colors: { [name: string]: string };
    breakpoints: { [name: string]: number };
  }
}
