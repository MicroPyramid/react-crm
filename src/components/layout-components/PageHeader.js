import React from 'react'
// import AppBreadcrumb from 'components/layout-components/AppBreadcrumb';

export const PageHeader = ({ title, display }) => {
	return (
		display ? (
			<div className="app-page-header">
				<h3 className="mb-0 mr-3 font-weight-semibold">
					
				</h3>
				{/* <AppBreadcrumb /> */}
			</div>
		)
		: null
	)
}

export default PageHeader