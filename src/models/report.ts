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
    if (!condition) this.condition = null;
    if (!virusppm) this.virusppm = null;
    if (!contppm) this.contppm = null;
  }
}
