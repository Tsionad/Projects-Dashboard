import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Project from './Project';
import defaultIcon from '../../assets/defaultProjectIcon_2x.png';
import styles from './Projects.css';


const ProjectsList = ({
  projects,
  newProject,
  updateProject,
  addProject,
  onDeleteIconClick,
  handleProjectTitle,
}) => {
  const renderList = _.map(projects, project => (
    <Project
      key={project.id}
      project={project}
      addProject={addProject}
      handleProjectTitle={handleProjectTitle}
      onDeleteIconClick={onDeleteIconClick}
      updateProject={updateProject}
    />
  ));

  return (
    <div className="projects" style={styles}>
      {newProject && (
        <div className="project">
          <img className="project-icon'" src={defaultIcon} alt="project icon" />
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
      {renderList}
    </div>
  );
};

ProjectsList.propTypes = {
  projects: PropTypes.array,
  newProject: PropTypes.bool.isRequired,
  onDeleteIconClick: PropTypes.func.isRequired,
  handleProjectTitle: PropTypes.func.isRequired,
  addProject: PropTypes.func.isRequired,
  updateProject: PropTypes.func.isRequired,
};

export default ProjectsList;
