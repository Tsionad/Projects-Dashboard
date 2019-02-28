import React from 'react'
import PropTypes from 'prop-types'

import {
  withStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@material-ui/core'

import questionIcon from '../../assets/Question.svg'
import styles from './Modal.css'

const ModalDialog = props => (
  <Dialog
    className="modal-dialog"
    onClose={props.handleCancel}
    open={props.visible}
    style={styles}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description">
    <div className="dialog-content">
      <img className="q-icon" src={questionIcon} alt="question" />
      <DialogTitle id="alert-dialog-title">
        Are you sure you want to delete this project?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          This action can&apos;t be undone
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleCancel} color="primary">
          NO
        </Button>
        <Button
          onClick={() => props.deleteProject(props.id)}
          color="primary"
          autoFocus>
          Yes
        </Button>
      </DialogActions>
    </div>
  </Dialog>
)

ModalDialog.propTypes = {
  id: PropTypes.number,
  deleteProject: PropTypes.func.isRequired,
  visible: PropTypes.bool,
  handleCancel: PropTypes.func.isRequired
}

export default withStyles(styles)(ModalDialog)
