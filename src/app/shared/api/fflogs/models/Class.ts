export interface Class {
  id: number;
  name: string;
}
/* FF logs wraps the class call in this to support a class -> spec hierarchy, but we only ever care about the specs array that they return
since FF doesn't have a tiered class/spec system.*/
export interface ClassWrapper {
  id: number;
  name: string;
  specs: Class[];
}
