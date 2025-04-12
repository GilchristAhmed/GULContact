export interface Contact {
              id?: number;
              user_id?: number;
              first_name: string;
              last_name: string;
              email: string;
              phone: string;
              photo: string;

}

export interface Pagination {
  page: number; // Numéro de la page actuelle
  pageSize: number; // Nombre d'éléments par page
  total: number; // Nombre total d'éléments
}

export interface ApiResponse {
  data: Contact[];
  pagination: Pagination;
}

