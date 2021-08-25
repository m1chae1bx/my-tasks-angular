export interface List {
  id?: string;
  name: string;
  owner: string; // @todo: i think not necessary in the future, should not be returned from server also
}
  