import React from 'react'
import PropTypes from 'prop-types'

import TableCell from '../TableCell/TableCell'
import ActionsMenu from '../../common/ActionsMenu/ActionsMenu'

const ArtifactsTableRow = ({
  content,
  convertToYaml,
  handleHoverOnRowActions,
  handleMouseLeaveFromRowActions,
  handleSelectItem,
  handleShowElements,
  index,
  match,
  rowItem,
  selectedItem,
  handlePreview
}) => {
  return (
    <div
      className="table_body__row parent_row"
      onMouseEnter={handleHoverOnRowActions}
      onMouseLeave={handleMouseLeaveFromRowActions}
    >
      {Object.values(rowItem).map((value, i) => {
        return (
          <TableCell
            selectedItem={selectedItem}
            data={value}
            item={content[index]}
            link={
              i === 0 &&
              `/projects/${match.params.projectName}/artifacts/${
                rowItem.key.value
              }/${match.params.tab ? match.params.tab : 'info'}`
            }
            selectItem={handleSelectItem}
            key={value.value + i}
            handleShowElements={handleShowElements}
            match={match}
            handlePreview={handlePreview}
          />
        )
      })}
      <div className="table_body__row__cell row__actions">
        <ActionsMenu convertToYaml={convertToYaml} item={content[index]} />
      </div>
    </div>
  )
}

ArtifactsTableRow.propTypes = {
  content: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  convertToYaml: PropTypes.func.isRequired,
  handleHoverOnRowActions: PropTypes.func.isRequired,
  handleMouseLeaveFromRowActions: PropTypes.func.isRequired,
  handleSelectItem: PropTypes.func.isRequired,
  handleShowElements: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  match: PropTypes.shape({}).isRequired,
  rowItem: PropTypes.shape({}).isRequired,
  selectedItem: PropTypes.shape({}).isRequired
}

export default ArtifactsTableRow
