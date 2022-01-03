import View from './view.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      //   e.preventDefault();
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkupButton(direction, page) {
    const nextOrPrevious = direction === 'right' ? 'next' : 'previous';

    return `
      <button data-goto="${page}" class="btn--inline pagination__btn--${nextOrPrevious}">
      <svg class="search__icon">
      <use href="${icons}#icon-arrow-${direction}"></use>
      </svg>
      <span>Page ${page}</span>
    </button>
      `;
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return this._generateMarkupButton('right', curPage + 1);
    }

    // last Page
    if (curPage === numPages && numPages > 1) {
      return this._generateMarkupButton('left', curPage - 1);
    }

    // other page
    if (curPage < numPages) {
      return `
      <button data-goto="${
        curPage - 1
      }" class="btn--inline pagination__btn--previous">
      <svg class="search__icon">
      <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${curPage - 1}</span>
    </button>

    <button data-goto="${
      curPage + 1
    }" class="btn--inline pagination__btn--next">
    <span>Page ${curPage + 1}</span>
      <svg class="search__icon">
      <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>
      `;
    }

    // Page 1, and there are no other pages
    return '';
  }
}

export default new PaginationView();
