/*
Copyright 2019 Iguazio Systems Ltd.

Licensed under the Apache License, Version 2.0 (the "License") with
an addition restriction as set forth herein. You may not use this
file except in compliance with the License. You may obtain a copy of
the License at http://www.apache.org/licenses/LICENSE-2.0.

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
implied. See the License for the specific language governing
permissions and limitations under the License.

In addition, you may not use the software for any purposes that are
illegal under applicable law, and the grant of the foregoing license
under the Apache 2.0 license is conditioned upon your compliance with
such restriction.
*/
import React from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'

import ArtifactsTableRow from '../../elements/ArtifactsTableRow/ArtifactsTableRow'
import ConsumerGroupShardLagTableRow from '../../elements/ConsumerGroupShardLagTableRow/ConsumerGroupShardLagTableRow'
import ConsumerGroupTableRow from '../../elements/ConsumerGroupTableRow/ConsumerGroupTableRow'
import Details from '../Details/Details'
import FeatureStoreTableRow from '../../elements/FeatureStoreTableRow/FeatureStoreTableRow'
import FunctionsTableRow from '../../elements/FunctionsTableRow/FunctionsTableRow'
import NoData from '../../common/NoData/NoData'
import { Tooltip, TextTooltipTemplate } from 'igz-controls/components'

import {
  ARTIFACTS_PAGE,
  CONSUMER_GROUPS_PAGE,
  CONSUMER_GROUP_PAGE,
  DATASETS_PAGE,
  FEATURE_STORE_PAGE,
  FILES_PAGE,
  FUNCTIONS_PAGE,
  GROUP_BY_NONE,
  MODELS_PAGE,
  REAL_TIME_PIPELINES_TAB
} from '../../constants'
import { ACTIONS_MENU } from '../../types'
import TableHead from './TableHead'

const TableView = ({
  actionsMenu,
  applyDetailsChanges,
  children,
  content,
  getCloseDetailsLink,
  groupFilter,
  groupLatestItem,
  groupedContent,
  handleCancel,
  handleExpandRow,
  handleSelectItem,
  isTablePanelOpen,
  mainRowItemsCount,
  pageData,
  params,
  retryRequest,
  selectedItem,
  tab,
  tableContent,
  tableContentRef,
  tableHeaders,
  tableHeadRef,
  tablePanelRef
}) => {
  return (
    <div className="table">
      <div className="table__content" ref={tableContentRef}>
        {pageData.tableHeaders && (
          <>
            <div className="table-head" ref={tableHeadRef}>
              {pageData.tableHeaders?.map(
                (item, index) =>
                  !item.hidden && (
                    <div
                      className={`table-head__item ${item.class}`}
                      key={`${item.header}${index}`}
                    >
                      <Tooltip template={<TextTooltipTemplate text={item.header} />}>
                        {item.header}
                      </Tooltip>
                    </div>
                  )
              )}
            </div>
            <div className="table-body">
              {!groupFilter ||
              isEmpty(groupedContent) ||
              (groupFilter === GROUP_BY_NONE && isEmpty(groupLatestItem)) ? (
                tableContent.map((rowItem, i) => {
                  switch (pageData.page) {
                    case CONSUMER_GROUPS_PAGE:
                      return <ConsumerGroupTableRow key={i} content={content} rowItem={rowItem} />
                    case CONSUMER_GROUP_PAGE:
                      return (
                        <ConsumerGroupShardLagTableRow
                          key={i}
                          content={content}
                          rowItem={rowItem}
                        />
                      )
                    case ARTIFACTS_PAGE:
                    case DATASETS_PAGE:
                    case FILES_PAGE:
                    case MODELS_PAGE:
                      return (
                        <ArtifactsTableRow
                          actionsMenu={actionsMenu}
                          content={content}
                          handleSelectItem={handleSelectItem}
                          key={i}
                          rowItem={rowItem}
                          pageData={pageData}
                          selectedItem={selectedItem}
                        />
                      )
                    case FEATURE_STORE_PAGE:
                      return (
                        <FeatureStoreTableRow
                          actionsMenu={actionsMenu}
                          content={content}
                          handleSelectItem={handleSelectItem}
                          key={i}
                          rowItem={rowItem}
                          pageData={pageData}
                          selectedItem={selectedItem}
                        />
                      )
                    case FUNCTIONS_PAGE:
                      return (
                        <FunctionsTableRow
                          actionsMenu={actionsMenu}
                          key={i}
                          content={content}
                          rowItem={rowItem}
                          selectedItem={selectedItem}
                          handleSelectItem={handleSelectItem}
                        />
                      )
                    default:
                      return null
                  }
                })
              ) : groupLatestItem.find(latestItem => !isEmpty(latestItem)) ? (
                tableContent.map((group, i) => {
                  switch (pageData.page) {
                    case ARTIFACTS_PAGE:
                    case DATASETS_PAGE:
                    case FILES_PAGE:
                    case MODELS_PAGE:
                      return params.pageTab === REAL_TIME_PIPELINES_TAB ? (
                        <FunctionsTableRow
                          actionsMenu={actionsMenu}
                          key={i}
                          content={content}
                          handleExpandRow={handleExpandRow}
                          handleSelectItem={handleSelectItem}
                          rowItem={groupLatestItem[i]}
                          selectedItem={selectedItem}
                          tableContent={group}
                        />
                      ) : (
                        <ArtifactsTableRow
                          actionsMenu={actionsMenu}
                          content={content}
                          handleSelectItem={handleSelectItem}
                          handleExpandRow={handleExpandRow}
                          key={i}
                          mainRowItemsCount={mainRowItemsCount}
                          rowItem={groupLatestItem[i]}
                          pageData={pageData}
                          selectedItem={selectedItem}
                          tableContent={group}
                        />
                      )
                    case FUNCTIONS_PAGE:
                      return (
                        <FunctionsTableRow
                          actionsMenu={actionsMenu}
                          key={i}
                          content={content}
                          handleExpandRow={handleExpandRow}
                          handleSelectItem={handleSelectItem}
                          rowItem={groupLatestItem[i]}
                          selectedItem={selectedItem}
                          tableContent={group}
                        />
                      )
                    default:
                      return (
                        <FeatureStoreTableRow
                          actionsMenu={actionsMenu}
                          content={content}
                          handleSelectItem={handleSelectItem}
                          handleExpandRow={handleExpandRow}
                          key={i}
                          mainRowItemsCount={mainRowItemsCount}
                          rowItem={groupLatestItem[i]}
                          pageData={pageData}
                          selectedItem={selectedItem}
                          tableContent={group}
                        />
                      )
                  }
                })
              ) : (
                <NoData />
              )}
            </div>
          </>
        )}
        {tableHeaders?.length > 0 && <TableHead content={tableHeaders} ref={tableHeadRef} />}
        {!pageData.tableHeaders && <div className="table-body">{children}</div>}
      </div>
      {isTablePanelOpen && (
        <div className="table__panel-container" ref={tablePanelRef}>
          <div className="table__panel">{pageData.tablePanel}</div>
        </div>
      )}
      {!isEmpty(selectedItem) && (
        <Details
          actionsMenu={actionsMenu}
          applyDetailsChanges={applyDetailsChanges}
          getCloseDetailsLink={getCloseDetailsLink}
          detailsMenu={pageData.details.menu}
          handleCancel={handleCancel}
          pageData={pageData}
          retryRequest={retryRequest}
          selectedItem={selectedItem}
          tab={tab}
        />
      )}
    </div>
  )
}

TableView.defaultProps = {
  applyDetailsChanges: () => {},
  getCloseDetailsLink: null,
  groupLatestJob: {}
}

TableView.propTypes = {
  actionsMenu: ACTIONS_MENU.isRequired,
  applyDetailsChanges: PropTypes.func,
  content: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  getCloseDetailsLink: PropTypes.func,
  handleCancel: PropTypes.func.isRequired,
  handleSelectItem: PropTypes.func.isRequired,
  isTablePanelOpen: PropTypes.bool.isRequired,
  pageData: PropTypes.shape({}).isRequired,
  params: PropTypes.shape({}).isRequired,
  retryRequest: PropTypes.func.isRequired,
  selectedItem: PropTypes.shape({}).isRequired,
  tab: PropTypes.string,
  tableContent: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({})),
    PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({})))
  ]).isRequired,
  tableHeaders: PropTypes.array,
  tableHeadRef: PropTypes.shape({}),
  tablePanelRef: PropTypes.shape({})
}

export default TableView
