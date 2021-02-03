import React from 'react';

export default function PasswordResetMessage() {
  return (
    <div className="main_container main_container_mt">
    <div class="container">
      <div class="row marl justify-content-center login_row">
        <div class="col-md-6 col-lg-6 col-xl-4">
          
          <div class="ow marl justify-content-center login_row">
            <div class="login_block">
              <div class="login_form_block">
                <div class="welcome">Django CRM</div>
                <p>
                  We've emailed you instructions for setting your password, if an account exists with the email you entered.
                  You should receive them shortly.
                </p>
                <p>
                  If you don't receive an email, please make sure you've entered the address you registered with,
                  and check your spam folder.
                </p>
                <p class="text-center">
                  <a href="/app">Login</a>
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    </div>
  )
}
