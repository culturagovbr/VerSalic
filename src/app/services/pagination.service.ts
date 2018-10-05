import { Injectable } from '@angular/core';

@Injectable()
export class PaginationService {

getPager(totalItems: number, currentPage: number = 1, pageSize: number = 12) {

      // Obtem o total de páginas
      const totalPages = Math.ceil(totalItems / pageSize);

      let startPage: number, endPage: number;

      if (totalPages <= pageSize) {
          // Menos de pageSize páginas, então mostra todas.
          startPage = 1;
          endPage = totalPages;
      } else {
          // Mais de pageSize páginas, então calcular índices de início e fim.
          if (currentPage <= (pageSize / 2 + 1)) {
              startPage = 1;
              endPage = pageSize;
          } else if (currentPage + (pageSize / 2 - 1) >= totalPages) {
              startPage = totalPages - (pageSize - 1);
              endPage = totalPages;
          } else {
              startPage = currentPage - (pageSize / 2);
              endPage = currentPage + (pageSize / 2) - 1;
          }
      }

      // Calcula índice final e inicial das páginas
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

      // Retorna o objeto com as propriedades da página requeridas na view
      return {
          totalItems: totalItems,
          currentPage: currentPage,
          pageSize: pageSize,
          totalPages: totalPages,
          startPage: startPage,
          endPage: endPage,
          startIndex: startIndex,
          endIndex: endIndex
      };
  }

}
