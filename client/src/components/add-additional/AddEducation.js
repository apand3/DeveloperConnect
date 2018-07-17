import React,{Component} from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaField from '../common/TextAreaField';

import { addEducation } from '../../actions/profileActions';

class AddEducation extends Component{
  constructor(props){
      super(props);
      this.state={
          school:'',
          degree:'',
          fieldofstudy:'',
          from:'',
          to:'',
          current:'',
          description:'',
          errors:{},
          disabled:false
      }
      this.onChange = this.onChange.bind(this);
            this.onSubmit = this.onSubmit.bind(this);
            this.onCheck = this.onCheck.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    const exp={
        school:this.state.school,
        degree:this.state.degree,
        fieldofstudy:this.state.fieldofstudy,
        from:this.state.from,
        to:this.state.to,
        current:(this.state.current=="" || this.state.current==null)?false:this.state.current,
        description:this.state.description,
        errors:{},
        disabled:false
    }
    this.props.addEducation(exp, this.props.history);
    
    
  }
  onCheck(e) {
    this.setState({
        disabled:!this.state.disabled,
        current:!this.state.current,
        to:''
    })
  }
    render(){
        const{errors}=this.state;

      return(
        
      
          <div className="add-experience">
        <div className="container">
        <div className="row">
        <div className="col-md-8 m-auto">
        <Link to="/dashboard" className="btn btn-light">
        Go Back</Link>
        <h1 className="display-4 text-center">Add Education</h1>
        <p className="lead text-center">Add any education</p>
        <small className="d-block pb-3">*=required</small>
        <form onSubmit={this.onSubmit}>
        <TextFieldGroup
                  placeholder="*School"
                  name="school"
                  value={this.state.school}
                  onChange={this.onChange}
                  error={errors.school}
                  
                />
        <TextFieldGroup
                  placeholder="*Degree"
                  name="degree"
                  value={this.state.degree}
                  onChange={this.onChange}
                  error={errors.degree}
                  
                />
                 <TextFieldGroup
                  placeholder="Field of study"
                  name="fieldofstudy"
                  value={this.state.fieldofstudy}
                  onChange={this.onChange}
                  error={errors.fieldofstudy}
                  
                />
                <h6>From Date</h6>
                <TextFieldGroup
                  placeholder="*From Date"
                  name="from"
                  value={this.state.from}
                  onChange={this.onChange}
                  error={errors.from}
                  type="date"
                />
                <h6>To Date</h6>
                <TextFieldGroup
                  placeholder="*To Date"
                  name="to"
                  value={this.state.to}
                  onChange={this.onChange}
                  error={errors.to}
                  type="date"
                  disabled={this.state.disabled?'disabled':''}
                />
            <div className="form-check mb-4">
              <input className="form-check-input" type="checkbox" name="current" value={this.state.current} checked={this.state.current} onChange={this.onCheck} id="current"/>
              <label className="form-check-label" htmlFor="current">
                Current Job
              </label>
            </div>
            <TextAreaField
                  placeholder="Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  error={errors.description}
                  info="Some of your educatin details, etc"
                />
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
                </form>
        </div>
        </div>
        </div>
          </div>
      )
  }
}
AddEducation.propTypes={
    addEducation:PropTypes.func.isRequired,
    profile:PropTypes.object.isRequired,
    errors:PropTypes.object.isRequired
}
const mapStateToProps=state=>({
profile:state.profile,
errors:state.errors
})
export default connect(mapStateToProps, { addEducation})(
    withRouter(AddEducation)
  );
//export default connect(mapStateRoute,{addExperience})(withRouter(AddExperience));
