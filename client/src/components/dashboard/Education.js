import React, { Component } from 'react'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import Moment from 'react-moment';
import { deleteEducation } from '../../actions/profileActions';
class Education extends Component {
    onDeleteClick(id){
        this.props.deleteEducation(id)
    }
    render() {
      const education=this.props.education.map(exp=>(
          <tr key={exp._id}>
          <td>{exp.school}</td>
          <td>{exp.degree}</td>
          <td>{exp.fieldofstudy}</td>
          <td>
              <Moment format="YYYY/MM/DD">{exp.from}</Moment> - {exp.to===null?'Now':<Moment format="YYYY/MM/DD">{exp.to}</Moment>}
              
         
        </td>
          <td><button className="btn btn-danger"
           onClick={this.onDeleteClick.bind(this,exp._id)}   >Delete</button></td>
              </tr>
      ))
    return (
      <div>
        <h4 className="mb-4">Education</h4>
        <table className="table">
<thead>
<tr>
    <th>School</th>
    <th>Degree</th>
    <th>Field of Study</th>

    </tr>
    </thead>
    <tbody>
    {education}
        </tbody>
        </table>
      </div>
    )
  }
}
Education.propTypes={
    deleteEducation:PropTypes.func.isRequired,
    profile:PropTypes.object.isRequired,
    errors:PropTypes.object.isRequired
}
const mapStateToProps=state=>({
profile:state.profile,
errors:state.errors
})
export default connect(mapStateToProps,{deleteEducation})(withRouter(Education));
