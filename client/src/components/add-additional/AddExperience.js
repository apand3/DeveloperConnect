import React,{Component} from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaField from '../common/TextAreaField';
import { ToastContainer } from "react-toastr";
import { addExperience } from '../../actions/profileActions';

class AddExperience extends Component{
  constructor(props){
      super(props);
      this.state={
          company:'',
          title:'',
          location:'',
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
        company:this.state.company,
        title:this.state.title,
        location:this.state.location,
        from:this.state.from,
        to:this.state.to,
        current:(this.state.current=="" || this.state.current==null)?false:this.state.current,
        description:this.state.description,
        errors:{},
        disabled:false
    }
    this.props.addExperience(exp, this.props.history);
    
    
  }
  onCheck(e) {
    //console.log(this.state.current)
    this.setState({
      
        disabled:!this.state.disabled,
        current:!(this.state.current),
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
        <h1 className="display-4 text-center">Add Experience</h1>
        <p className="lead text-center">Add any job or position</p>
        <small className="d-block pb-3">*=required</small>
        <form onSubmit={this.onSubmit}>
        <TextFieldGroup
                  placeholder="*Title"
                  name="title"
                  value={this.state.title}
                  onChange={this.onChange}
                  error={errors.title}
                  info="Could be your position title"
                />
        <TextFieldGroup
                  placeholder="*Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                  info="Could be your own company or one you work for"
                />
                 <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                  
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
                  info="Some of your responsabilities, etc"
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
AddExperience.propTypes={
    addExperience:PropTypes.func.isRequired,
    profile:PropTypes.object.isRequired,
    errors:PropTypes.object.isRequired
}
const mapStateToProps=state=>({
profile:state.profile,
errors:state.errors
})
export default connect(mapStateToProps, { addExperience })(
    withRouter(AddExperience)
  );
//export default connect(mapStateRoute,{addExperience})(withRouter(AddExperience));
