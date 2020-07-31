import React, { Component } from 'react';

export default class ForgotPassword extends Component {
  render() {
    return (
      <div className="container">
        <div className="row marl justify-content-center login_row">
          <div className="col-md-6 col-lg-6 col-xl-4">
            <div className="login_block">
              <div className="login_form_block">
                <div className="card-title">
                  <center>
                    <h2 className="welcome">Forgot Password</h2>
                  </center>
                </div>
                <form method="post">
                  <div className="form-group">
                    <input type="text" className="form-control" id="exampleinputmail" placeholder="Email" name="email" />
                  </div>
                  <span className="error"></span>
                  <input type="hidden" name="csrfmiddlewaretoken" value="gutrZqHraIsF688uNtedV7TiyquOqHZWk0V3mXZgNey3p3NF0EI7qMyTxZ0Vf6M0" />
                  <center><button type="submit" className="btn btn-danger">Submit</button></center>
                  <div className="col-sm-10 form-group text-center forgot" style={{ marginTop: '10px' }}>
                    Already Have An Account? <a onClick={() => this.props.history.push('/login')}>Login</a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
