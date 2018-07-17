import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import isEmpty from '../../validation/is.Empty'
class ProfileHeader extends Component {
  render() {
    const { profile } = this.props;
    return (
        <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-info text-white mb-3">
            <div className="row">
              <div className="col-4 col-md-3 m-auto">
                <img className="rounded-circle" src={profile.user.avatar} alt="" />
              </div>
            </div>
            <div className="text-center">
              <h1 className="display-4 text-center">{profile.user.name}</h1>
              <p className="lead text-center">{profile.status} at {profile.company}</p>
              <p>{profile.location}</p>
              <p>
                  {
isEmpty(profile.website)?null:(<a className="text-white p-2" target="_blank" href={profile.website}>
<i className="fas fa-globe fa-2x"></i>
</a>)
                  }
            
                 {
(profile.social.facebook==undefined || profile.social.facebook==null)?null:(<a target="_blank" className="text-white p-2" href={profile.social.facebook}>
<i className="fab fa-facebook fa-2x"></i>
</a>)
                  }
                   {
(profile.social.linkedin==undefined || profile.social.linkedin==null)?null:(<a target="_blank" className="text-white p-2" href={profile.social.linkedin}>
<i className="fab fa-linkedin fa-2x"></i>
</a>)
                  }
                   
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
ProfileHeader.propTypes = {
    profile: PropTypes.object.isRequired
  };
export default ProfileHeader;