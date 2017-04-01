import { Location } from './location';

export class Report {
  constructor(
    public name: string,
    public reporter: string,
    public condition: string,
    public virusppm: number,
    public contppm: number,
    public location: Location,
    public timestamp: number) {
  }
}
