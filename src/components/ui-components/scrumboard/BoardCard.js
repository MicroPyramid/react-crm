import React from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { Card, Tooltip, Tag } from 'antd';
import { getLabelsColor, AssigneeAvatar } from './utils';
import { CalendarOutlined, CommentOutlined, PaperClipOutlined } from '@ant-design/icons';
import moment from 'moment';
import { Scrollbars } from 'react-custom-scrollbars-2';

const InnerCardList = React.memo(function InnerCardList(props) {
  return props.contents?.map((item, index) => (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {( dragProvided, dragSnapshot) => (
        <div
          className='mb-3'
          key={item.id}
					ref={dragProvided.innerRef}
					{...dragProvided.draggableProps}
					{...dragProvided.dragHandleProps}
        >
          <Card 
            hoverable 
            className='board-card'
            cover={null} 
            onClick={() => props.cardData(item, props.listId)}
          >
            {item.cover ? <img src={item.cover} className="rounded img-fluid" alt="cover"/> : null}
            {item.labels.map(label => 
              <Tooltip title={label} key={label}>
                <div className={`board-label ${getLabelsColor(label)}`}></div>
              </Tooltip>
            )}
            <h4 className="mb-2">{item.name}</h4>
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                {item.dueDate?
                  <Tag className="bg-gray-lightest" > 
                    <CalendarOutlined />
                    <span className="ml-1 font-weight-semibold">{moment(item.dueDate).format('DD MMMM')}</span>
                  </Tag>
                  :
                  null
                }
                <SubIndicator counts={item.comments.length} icon={<CommentOutlined />}/>
                <SubIndicator counts={item.attachments.length} icon={<PaperClipOutlined />}/>
              </div>
              <div className="d-flex">
                {item.members.map(member =>
                  <AssigneeAvatar key={member} id={member} size={25} chain/>
                )}
              </div>
            </div>
          </Card>
				</div>
      )}
    </Draggable>
  ));
});

function InnerList(props) {
  const { contents, dropProvided, cardData, listId } = props;

  return (
    <div className="board-dropzone" ref={dropProvided.innerRef}>
      <InnerCardList cardData={cardData} contents={contents} listId={listId}/>
      {dropProvided.placeholder}
    </div>
  );
}

function SubIndicator(props) {
  if(props.counts) {
    return (
      <p className="mb-0 mr-2">
        {props.icon}
        <span className="ml-1">{props.counts}</span>
      </p>
    )
  }
  return null
}

export default function BoardCard(props) {
	const {
    ignoreContainerClipping,
    internalScroll,
    scrollContainerStyle,
    isDropDisabled,
    isCombineEnabled,
    listId = 'LIST',
    listType,
    style,
    contents,
    useClone,
    cardData
  } = props;
	return (
    <>
      <Droppable
        droppableId={listId}
        type={listType}
        ignoreContainerClipping={ignoreContainerClipping}
        isDropDisabled={isDropDisabled}
        isCombineEnabled={isCombineEnabled}
        renderClone={useClone}
      >
        {(
          dropProvided,
          dropSnapshot,
        ) => (
          <Scrollbars style={style} className="board-wrapper" autoHide {...dropProvided.droppableProps}>
            {internalScroll ? (
              <div className="board-scrollContainer" style={scrollContainerStyle}>
                <InnerList
                  contents={contents}
                  listId={listId}
                  cardData={cardData}
                  dropProvided={dropProvided}
                />
              </div>
            ) : (
              <InnerList
                contents={contents}
                listId={listId}
                cardData={cardData}
                dropProvided={dropProvided}
              />
            )}
          </Scrollbars>
        )}
      </Droppable>
    </>
  );
}