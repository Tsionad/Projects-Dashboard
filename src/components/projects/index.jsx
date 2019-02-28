import React, { Component } from 'react'

import MainHeader from '../navbar/Appbar'
import ProjectsList from './ProjectsList'
import ModalDialog from '../modal/Modal'
import styles from './Projects.css'

class ProjectsContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      newProject: false,
      projects: [],
      projectTitle: '',
      showModal: false
    }

    this.handleNewProject = this.handleNewProject.bind(this)
    this.addProject = this.addProject.bind(this)
    this.onDeleteIconClick = this.onDeleteIconClick.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.deleteProject = this.deleteProject.bind(this)
    this.updateProject = this.updateProject.bind(this)
    this.handleProjectTitle = this.handleProjectTitle.bind(this)
    this.onDragOver = this.onDragOver.bind(this)
  }

  onDeleteIconClick(e, id) {
    e.preventDefault()
    this.setState({ showModal: true, projectId: id })
  }

  deleteProject(id) {
    const { projects } = this.state
    const filteredprojects = [...projects]

    // Find and remove item by index with matching id
    const index = filteredprojects.findIndex(obj => obj.id === id)
    filteredprojects.splice(index, 1)

    this.setState({
      projects: filteredprojects,
      showModal: false
    })
  }

  handleCancel() {
    this.setState({ showModal: false })
  }

  handleNewProject() {
    this.setState({ newProject: true })
  }

  handleProjectTitle(e) {
    this.setState({ projectTitle: e.target.value })
  }

  addProject(e) {
    const projectTitle = e.target.value

    if (projectTitle !== '') {
      const project = {
        id: Date.now(),
        title: this.state.projectTitle
      }

      this.setState(prevState => ({
        projects: prevState.projects.concat(project),
        projectTitle: '',
        newProject: false
      }))
    }
    e.preventDefault()
  }

  updateProject(e, id) {
    const { projects } = this.state
    const updated = projects.map(project => {
      if (project.id === id) {
        return {
          id: project.id,
          title: this.state.projectTitle
        }
      }
      return project
    })
    this.setState({ projects: updated })
    e.preventDefault()
  }

  onDragOver(result) {
    const { projects } = this.state
    const shuffled = [...projects]

    const { destination, source, draggableId } = result
    if (!destination) {
      return
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }
    const dragItem = projects[source.index]
    shuffled.splice(source.index, 1)
    shuffled.splice(destination.index, 0, draggableId)
    shuffled[destination.index] = dragItem

    this.setState({ projects: shuffled })
  }

  render() {
    return (
      <div className="projects-container" style={styles}>
        <MainHeader handleNewProject={this.handleNewProject} />
        <ProjectsList
          addProject={this.addProject}
          updateProject={this.updateProject}
          onDeleteIconClick={this.onDeleteIconClick}
          handleProjectTitle={this.handleProjectTitle}
          onDragOver={this.onDragOver}
          newProject={this.state.newProject}
          projects={this.state.projects}
        />
        {this.state.showModal && (
          <ModalDialog
            id={this.state.projectId}
            visible={this.state.showModal}
            handleCancel={this.handleCancel}
            deleteProject={this.deleteProject}
          />
        )}
      </div>
    )
  }
}

export default ProjectsContainer
