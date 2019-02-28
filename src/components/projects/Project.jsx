import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import styles from './Projects.css'

import { Draggable } from 'react-beautiful-dnd'

import defaultIcon from '../../assets/defaultProjectIcon_2x.png'
import EditIconHover from '../../assets/EditIcon_Hover.svg'
import DeleteIconHover from '../../assets/DeleteIcon_Hover.svg'
import EditIcon from '../../assets/EditIcon.svg'
import DeleteIcon from '../../assets/DeleteIcon.svg'

class Project extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isEditing: false,
      edit: EditIcon,
      delete: DeleteIcon
    }
  }

  render() {
    const {
      project,
      handleProjectTitle,
      updateProject,
      onDeleteIconClick,
      id,
      index
    } = this.props
    return (
      <Draggable draggableId={id} index={index}>
        {provided => (
          <div
            className="project-item"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}>
            <div className="project" style={styles}>
              <img
                className="project-icon"
                src={defaultIcon}
                alt="project icon"
              />
              {this.state.isEditing ? (
                <form
                  onSubmit={e => {
                    updateProject(e, project.id)
                    this.setState({ isEditing: false })
                  }}>
                  <input
                    className="project-input"
                    type="text"
                    placeholder="Name your project"
                    onChange={handleProjectTitle}
                  />
                  <input type="submit" style={{ display: 'none' }} />
                </form>
              ) : (
                <div>
                  <p className="project-title">{project.title}</p>
                  <img
                    className="edit-icon"
                    alt="edit"
                    src={this.state.edit}
                    onClick={() => this.setState({ isEditing: true })}
                    onMouseEnter={() => this.setState({ edit: EditIconHover })}
                    onMouseLeave={() => this.setState({ edit: EditIcon })}
                  />
                </div>
              )}
              <span className="project-date">
                {moment(project.id).format('MMM DD, YYYY  hh:mma')}
              </span>
              <img
                className="delete-icon"
                alt="delete"
                src={this.state.delete}
                onClick={e => onDeleteIconClick(e, project.id)}
                onMouseEnter={() => this.setState({ delete: DeleteIconHover })}
                onMouseLeave={() => this.setState({ delete: DeleteIcon })}
              />
            </div>
          </div>
        )}
      </Draggable>
    )
  }
}

Project.propTypes = {
  id: PropTypes.string,
  onDeleteIconClick: PropTypes.func.isRequired,
  handleProjectTitle: PropTypes.func.isRequired,
  updateProject: PropTypes.func.isRequired,
  project: PropTypes.object,
  index: PropTypes.number
}

export default Project
