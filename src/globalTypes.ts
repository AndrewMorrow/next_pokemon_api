export interface Pokemon {
  id: 1;
  name: string;
  japanese_name: string;
  chinese_name: string;
  french_name: string;
  primary_type: number;
  secondary_type: number;

  hp: number;
  attack: number;
  defense: number;
  special_attack: number;
  special_defense: number;
  speed: number;

  primaryTypeRelation: { id: number; type: string };
  secondaryTypeRelation: { id: number; type: string };
}
