import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

import { dataTestIds } from '../../utils';
import { formatNumber } from '../../helpers';

const ListItem = (props) => {
  const { index, itemNumber, name, testIds,
    callback, info1, info2, info3, btn } = props;

  return (
    <section className="list-item-container">
      <span data-testid={ `${dataTestIds[testIds[0]]}${index}` }>{ itemNumber }</span>
      <span data-testid={ `${dataTestIds[testIds[1]]}${index}` }>{ name }</span>
      <span data-testid={ `${dataTestIds[testIds[2]]}${index}` }>{ info1 }</span>
      <span
        data-testid={ `${dataTestIds[testIds[3]]}${index}` }
      >
        { formatNumber(info2) }
      </span>
      {
        info3 && (
          <span
            data-testid={ `${dataTestIds[testIds[4]]}${index}` }
          >
            { formatNumber(info3) }
          </span>
        )
      }
      {
        btn && (
          <button
            className={ (btn === 'Excluir') ? 'item-exclude-btn' : 'item-remove-btn' }
            type="button"
            onClick={ () => callback(name) }
            data-testid={
              dataTestIds[testIds[5]]
                ? `${dataTestIds[testIds[5]]}${index}`
                : `${dataTestIds[testIds[4]]}${index}`
            }
          >
            { btn }
          </button>
        )
      }
    </section>
  );
};

ListItem.defaultProps = {
  callback: () => {},
  info3: '',
  btn: '',
};

const { string, number, func, arrayOf } = PropTypes;

ListItem.propTypes = {
  index: number.isRequired,
  itemNumber: number.isRequired,
  name: string.isRequired,
  testIds: arrayOf(string.isRequired).isRequired,
  callback: func,
  info1: number.isRequired,
  info2: string.isRequired,
  info3: string,
  btn: string,
};

export default ListItem;
