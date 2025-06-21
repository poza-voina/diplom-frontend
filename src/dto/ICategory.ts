export interface ICategory {
  id: number;
  title: string;
  countRoutes: number;
}

export interface ICategoryW extends ICategory {
  editingStatus: CategoryEditingStatus;
}

export enum CategoryEditingStatus {
  DEFAULT,
  EDITING
}

