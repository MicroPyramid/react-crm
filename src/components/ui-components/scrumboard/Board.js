import React, { useContext, useState } from 'react'
import { ScrumboardContext } from './ScrumboardContext'
import { Button, Form, Input, Modal } from 'antd';
import { Draggable } from 'react-beautiful-dnd';
import BoardCard from './BoardCard';
import { modalModeTypes } from './utils';
// import EllipsisDropdown from 'components/shared-components/EllipsisDropdown'

import { CloseOutlined, EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

const RenameForm = ({ title, finish }) => {
	const [form] = Form.useForm();

	const onRenameSubmit = values => {
		finish(values.title)
	};

	const onClose = () => {
    form.submit();
  };
 
	return (
		<Form 
			form={form}
			name="renameField" 
			onFinish={onRenameSubmit} 
			layout="vertical"
			autoComplete="off"
			className="w-100"
			initialValues={{
				title: title,
			}}
		>
			<Form.Item name="title" className="mb-0">
				<Input 
					autoFocus 
					value={title}
					suffix={
						<div className="cursor-pointer" onClick={() => onClose()}>
							<CloseOutlined />
						</div>
					}
				/>
			</Form.Item>
		</Form>
	)
}

const Board = ({ title, contents, index, isScrollable, isCombineEnabled, useClone }) => {
	const { updateModal, updateModalMode, updateCurrentListId, updateCardData, columns, updateColumns, ordered, updateOrdered } = useContext(ScrumboardContext)
	const [renameActive, setRenameActive] = useState('')

	const newCard = listId => {
		updateModal(true)
		updateModalMode(modalModeTypes(0))
		updateCurrentListId(listId)
	}

	const onUpdateCardModal = (obj, listId) => {
		updateModal(true)
		updateModalMode(modalModeTypes(1))
		updateCurrentListId(listId)
		updateCardData(obj)
	}
	
	const onTitleClick = title => {
		setRenameActive(title)
	}

	const onFinish = newTitle => {
		if(newTitle) {
			const newColumns = {};
			delete Object.assign(newColumns, columns, {[newTitle]: columns[title] })[title];
			const newOrder = ordered.map(elm => {
				if(elm === title) {
					return newTitle
				}
				return elm
			})
			updateColumns(newColumns)
			updateOrdered(newOrder)
		}
		setRenameActive('')
	};

	const onBoardDelete = title => {
		Modal.confirm({
			title: 'Do you want to delete this board?',
			icon: <ExclamationCircleOutlined />,
			okText: 'Yes',
			cancelText: 'Cancel',
			onOk() {
				const newOrder = ordered.filter(elm => elm !== title)
				const newColumns = {}
				Object.assign(newColumns, columns)
				delete newColumns[title]
				updateColumns(newColumns)
				updateOrdered(newOrder)
			},
		});
	}
	
	return (
		<Draggable draggableId={title} index={index}>
			{
				(provided, snapshot) => (
					<div className="board-column" ref={provided.innerRef} {...provided.draggableProps}>
						<div className="board-title" {...provided.dragHandleProps}>
							{
								renameActive === title ? (
									<RenameForm title={title} finish={onFinish} />
								)
								:
								(
									<>
										<h4 className="mb-0" >{title}</h4>
										{/* <EllipsisDropdown menu={
											<Menu>
												<Menu.Item onClick={() => onTitleClick(title)}>
													<EditOutlined />
													<span>Rename Board</span>
												</Menu.Item>
												<Menu.Item onClick={() => onBoardDelete(title)}>
													<DeleteOutlined />
													<span>Delete Board</span>
												</Menu.Item>
											</Menu>
										}/> */}
									</>
								)
							}
						</div>
						<BoardCard
							listId={title}
							listType="CONTENT"
							className={snapshot.isDragging ? 'is-dragging' : ''}
							contents={contents}
							internalScroll={isScrollable}
							isCombineEnabled={isCombineEnabled}
							useClone={useClone}
							cardData={onUpdateCardModal}
						/>
						{/* <div className="board-add" onClick={() => newCard(title)}>
							<div>Add task</div>
						</div> */}
					</div>
				)
			}
		</Draggable>
	)
}

export default Board
