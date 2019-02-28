import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

import Project from './Project'
import defaultIcon from '../../assets/defaultProjectIcon_2x.png'
import styles from './Projects.css'

const ProjectsList = ({
  projects,
  newProject,
  updateProject,
  addProject,
  onDragOver,
  onDeleteIconClick,
  handleProjectTitle
}) => {
  const renderList = _.map(projects, (project, index) => (
    <Project
      key={project.id}
      id={project.id}
      index={index}
      project={project}
      addProject={addProject}
      handleProjectTitle={handleProjectTitle}
      onDeleteIconClick={onDeleteIconClick}
      onDragOver={onDragOver}
      updateProject={updateProject}
    />
  ))

  return (
    <DragDropContext onDragEnd={onDragOver}>
      <div className="projects" style={styles}>
        {newProject && (
          <div className="project">
            <img
              className="project-icon'"
              src={defaultIcon}
              alt="project icon"
            />
            <form onSubmit={addProject}>
              <input
                className="project-input"
                type="text"
                name="projectTitle"
                placeholder="Name your project"
                onChange={handleProjectTitle}
              />
              <input type="submit" style={{ display: 'none' }} />
            </form>
          </div>
        )}
        <Droppable droppableId="dnd-container">
          {provided => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}>
              {renderList}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  )
}

ProjectsList.propTypes = {
  projects: PropTypes.array,
  newProject: PropTypes.bool.isRequired,
  onDeleteIconClick: PropTypes.func.isRequired,
  handleProjectTitle: PropTypes.func.isRequired,
  addProject: PropTypes.func.isRequired,
  updateProject: PropTypes.func.isRequired,
  onDragOver: PropTypes.func.isRequired
}

export default ProjectsList
