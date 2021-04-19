console.log('test hoc');

import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
  <div>
    <h1>Info</h1>
    <p>Info is: {props.info}</p>
  </div>
);

const withAdminWarning = (WrappedComponent) => {
  return (props) => (
      <div>
        {props.isAdmin && <p>This is private</p>}
        <WrappedComponent {...props}/>
      </div>
    );
};

const requiredAuthentication = (WrappedComponent) => {
  return (props) => (
    <div>
      {props.isAuthenticated ? <WrappedComponent {...props}/> : <p>Required Authentication!</p>}
    </div>
  );
};

const AdminInfo = withAdminWarning(Info);
const AuthInfo = requiredAuthentication(Info);

//ReactDOM.render(<AdminInfo isAdmin={true} info="This are the details" />, document.getElementById('app'));
ReactDOM.render(<AuthInfo isAuthenticated={true} info="This are the details" />, document.getElementById('app'));