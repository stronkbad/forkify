import View from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return this._generateMarkupButton(curPage, 'next');
    }
    // Last page
    if (curPage === numPages && numPages > 1) {
      return this._generateMarkupButton(curPage, 'prev');
    }
    // Other page
    if (curPage < numPages) {
      return `
        ${this._generateMarkupButton(curPage, 'prev')}
        ${this._generateMarkupButton(curPage, 'next')}
        `;
    }
    // Page 1, and there are NO other pages
    return '';
  }

  // Generate markup button
  _generateMarkupButton(page, type) {
    return `
    <button data-goto="${
      type === 'prev' ? page - 1 : page + 1
    }" class="btn--inline pagination__btn--${type}" data-goto=${
      type === 'prev' ? page - 1 : page + 1
    }>

        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-${
      type === 'prev' ? 'left' : 'right'
    }"></use>
        </svg>
    </button>
    `;
  }
}

export default new PaginationView();
