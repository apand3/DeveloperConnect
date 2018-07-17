import React, { Component } from 'react';
import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileCr from './ProfileCr';
import ProfileGithub from './ProfileGithub';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import { Link } from 'react-router-dom';
import Spinner from '../common/spinner';
import {getProfileByHandle} from '../../actions/profileActions'
class Profile extends Component {
    componentDidMount() {
       // if (this.props.match.params.handle) {
          this.props.getProfileByHandle(this.props.match.params.handle);
       // }
      }
  
    render() {
        const { profile, loading } = this.props.profile;
        let profileContecnt;
    if(profile==null || loading){
        profileContecnt=<Spinner/>
    }
    else{
        profileContecnt= <div>
            <div className="row">
<div className="col-md-6">
<Link to="/profiles" className="btn btn-light mb-3 float-left">
Back to profiles</Link>
</div>
<div className="col-md-6"/>
            </div>
            <ProfileHeader  profile={profile} />
        <ProfileAbout profile={profile}/>
        <ProfileCr education={profile.education} experience={profile.experience}/>
        {profile.githubuser ? (
            <ProfileGithub username={profile.githubuser} />
          ) : null}
            </div>
    }
    
        return (
      <div className="profile">
          <div className="container">
          <div className="row">
            <div className="col-md-12">  
                {profileContecnt}
                </div>
                </div>
          </div>
      </div>
    )
  }
}
Profile.propTypes={
    getProfileByHandle:PropTypes.func.isRequired,
    profile:PropTypes.object.isRequired,
    errors:PropTypes.object.isRequired
}
const mapStateToProps=state=>({
    profile:state.profile,
    errors:state.errors
    })
export default connect(mapStateToProps,{getProfileByHandle})(withRouter(Profile));
