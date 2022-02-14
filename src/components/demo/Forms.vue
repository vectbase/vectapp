<template>
  <div class="container">
    <div class="page-title">
      <h3>Forms</h3>
    </div>
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-header">Basic Form</div>
          <div class="card-body">
            <h5 class="card-title">Lorem ipsum dolor sit amet consectetur.</h5>
            <form accept-charset="utf-8">
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" name="email" placeholder="Email Address" class="form-control" required>
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" name="password" placeholder="Password" class="form-control" required>
              </div>
              <div class="mb-3">
                <input type="submit" class="btn btn-primary">
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="col-lg-12">
        <div class="card">
          <div class="card-header">Horizontal Form</div>
          <div class="card-body">
            <h5 class="card-title">Lorem ipsum dolor sit amet consectetur.</h5>
            <form accept-charset="utf-8">
              <div class="mb-3 row">
                <label class="col-sm-2 form-label" for="email">Email</label>
                <div class="col-sm-10">
                  <input type="email" name="email" placeholder="Email Address" class="form-control">
                  <small class="form-text">Example help text that remains unchanged.</small>
                </div>
              </div>
              <div class="mb-3 row">
                <label class="col-sm-2 form-label" for="password">Password</label>
                <div class="col-sm-10">
                  <input type="password" name="password" placeholder="Pasword" class="form-control">
                  <small class="form-text">Example help text that remains unchanged.</small>
                </div>
              </div>
              <div class="mb-3 row">
                <div class="col-sm-10 offset-sm-2">
                  <input type="submit" class="btn btn-primary">
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="card">
          <div class="card-header">Inline Form</div>
          <div class="card-body">
            <h5 class="card-title">Example inline form</h5>
            <form accept-charset="utf-8">
              <div class="row g-2">
                <div class="col">
                  <label for="name" class="form-label sr-only">Name</label>
                  <input name="name" type="text" placeholder="Jane Doe" class="form-control">
                </div>
                <div class="col">
                  <label for="username" class="form-label sr-only">Password</label>
                  <input type="text" name="username" placeholder="Username" class="form-control">
                </div>
                <div class="col">
                  <button type="submit" class="btn btn-primary">Save</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="card">
          <div class="card-header">Modal Form</div>
          <div class="card-body text-center">
            <h5 class="card-title">Example popup signin form</h5>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Launch form</button>
            <div class="modal fade" id="exampleModal" role="dialog" tabindex="-1">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title">Signin Modal</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body text-start">
                    <p>Lorem ipsum dolor sit amet consectetur.</p>
                    <form accept-charset="utf-8">
                      <div class="mb-3">
                        <label for="email" class="form-label">Email</label>
                        <input type="email" name="email" placeholder="Email Address" class="form-control">
                      </div>
                      <div class="mb-3">
                        <label for="password" class="form-label">Password</label>
                        <input type="password" name="password" placeholder="Password" class="form-control">
                      </div>
                      <div class="mb-3">
                        <button type="submit" class="btn btn-primary">Signin</button>
                      </div>
                    </form>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-12">
        <div class="card">
          <div class="card-header">Form Validation</div>
          <div class="card-body">
            <h5 class="card-title">Example form with inline field validations</h5>
            <form class="needs-validation" novalidate accept-charset="utf-8">
              <div class="row g-2">
                <div class="mb-3 col-md-6">
                  <label for="email" class="form-label">Email</label>
                  <input type="email" class="form-control" name="email" placeholder="Email" required>
                  <small class="form-text text-muted">Enter a valid email address.</small>
                  <div class="valid-feedback">Looks good!</div>
                  <div class="invalid-feedback">Please enter your email address.</div>
                </div>
                <div class="mb-3 col-md-6">
                  <label for="password" class="form-label">Password</label>
                  <input type="password" class="form-control" name="password" placeholder="Password" required>
                  <small class="form-text text-muted">Your password must be 8-20 characters long, contain letters and numbers only.</small>
                  <div class="valid-feedback">Looks good!</div>
                  <div class="invalid-feedback">Please enter your password.</div>
                </div>
              </div>
              <div class="mb-3">
                <label for="address" class="form-label">Address</label>
                <input type="text" class="form-control" name="address" placeholder="1234 Main St, Unit, Building, or Floor" required>
                <div class="valid-feedback">Looks good!</div>
                <div class="invalid-feedback">Please enter your address.</div>
              </div>
              <div class="row g-2">
                <div class="mb-3 col-md-6">
                  <label for="city" class="form-label">City</label>
                  <input type="text" class="form-control" name="city" placeholder="City" required>
                  <div class="valid-feedback">Looks good!</div>
                  <div class="invalid-feedback">Please enter your City.</div>
                </div>
                <div class="mb-3 col-md-4">
                  <label for="state" class="form-label">State</label>
                  <select name="state" class="form-select" required>
                    <option value="" selected>Choose...</option>
                    <option value="1">New York</option>
                    <option value="2">Los Angeles</option>
                  </select>
                  <div class="valid-feedback">Looks good!</div>
                  <div class="invalid-feedback">Please select a State.</div>
                </div>
                <div class="mb-3 col-md-2">
                  <label for="zip" class="form-label">Zip code</label>
                  <input type="text" class="form-control" name="zip" placeholder="00000" required>
                  <div class="valid-feedback">Looks good!</div>
                  <div class="invalid-feedback">Please enter a Zip code.</div>
                </div>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" id="check1" required>
                  <label class="form-check-label" for="check1">
                    Check me out
                  </label>
                  <div class="invalid-feedback">You must agree before submitting.</div>
                </div>
              </div>
              <button type="submit" class="btn btn-primary"><i class="fas fa-save"></i> Save</button>
            </form>
          </div>
        </div>
      </div>
      <div class="col-lg-12">
        <div class="card">
          <div class="card-header">All form elements</div>
          <div class="card-body">
            <h5 class="card-title"></h5>
            <form class="">
              <div class="mb-3 row">
                <label class="col-sm-2">Normal</label>
                <div class="col-sm-10">
                  <input type="text" name="" class="form-control">
                </div>
              </div>
              <div class="line"></div><br>
              <div class="mb-3 row">
                <label class="col-sm-2">Help text</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control">
                  <small class="form-text text-muted">A help text that brings hint to users.</small>
                </div>
              </div>
              <div class="line"></div><br>
              <div class="mb-3 row">
                <label class="col-sm-2">Password</label>
                <div class="col-sm-10">
                  <input type="password" name="password" class="form-control">
                </div>
              </div>
              <div class="line"></div><br>
              <div class="mb-3 row">
                <label class="col-sm-2">Placeholder</label>
                <div class="col-sm-10">
                  <input type="text" placeholder="placeholder" class="form-control">
                </div>
              </div>
              <div class="line"></div><br>
              <div class="mb-3 row">
                <label class="col-sm-2">Disabled</label>
                <div class="col-sm-10">
                  <input type="text" disabled="" placeholder="disabled or read only input here" class="form-control" readonly>
                </div>
              </div>
              <div class="line"></div><br>
              <div class="mb-3 row">
                <label class="col-sm-2">Checkboxes and radios <br>
                  <small class="text-info">Normal Bootstrap elements</small>
                </label>
                <div class="col-sm-10">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="check2">
                    <label class="form-check-label" for="check2">
                      Check this default checkbox
                    </label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="radio1">
                    <label class="form-check-label" for="radio1">
                      Default radio
                    </label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="radio2" checked>
                    <label class="form-check-label" for="radio2">
                      Default checked radio
                    </label>
                  </div>
                </div>
              </div>
              <div class="line"></div><br>
              <div class="mb-3 row">
                <label class="col-sm-2">Inline checkboxes</label>
                <div class="col-sm-10">
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1">
                    <label class="form-check-label" for="inlineCheckbox1">1</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2">
                    <label class="form-check-label" for="inlineCheckbox2">2</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" id="inlineCheckbox3" value="option3" disabled>
                    <label class="form-check-label" for="inlineCheckbox3">3 (disabled)</label>
                  </div>
                </div>
              </div>
              <div class="line"></div><br>
              <div class="mb-3 row">
                <label class="col-sm-2">Toggle Switch<br>
                  <small class="text-info">Custom elements</small>
                </label>
                <div class="col-sm-10">
                  <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault">
                    <label class="form-check-label" for="flexSwitchCheckDefault">Default switch checkbox input</label>
                  </div>
                  <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked>
                    <label class="form-check-label" for="flexSwitchCheckChecked">Checked switch checkbox input</label>
                  </div>
                  <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" id="flexSwitchCheckDisabled" disabled>
                    <label class="form-check-label" for="flexSwitchCheckDisabled">Disabled switch checkbox input</label>
                  </div>
                  <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" id="flexSwitchCheckCheckedDisabled" checked disabled>
                    <label class="form-check-label" for="flexSwitchCheckCheckedDisabled">Disabled checked switch checkbox input</label>
                  </div>
                </div>
              </div>
              <div class="line"></div><br>
              <div class="mb-3 row">
                <label class="col-sm-2">Select</label>
                <div class="col-sm-10 select">
                  <select name="" class="form-select">
                    <option value="">option 1</option>
                    <option value="">option 2</option>
                    <option value="">option 3</option>
                    <option value="">option 4</option>
                  </select>
                </div>
                <div class="col-sm-10 offset-sm-2 select">
                  <br>
                  <select name="" multiple="" class="form-select">
                    <option value="">option 1</option>
                    <option value="">option 2</option>
                    <option value="">option 3</option>
                    <option value="">option 4</option>
                  </select>
                  <small class="form-text">Select for than one</small>
                </div>
              </div>
              <div class="line"></div><br>
              <div class="mb-3 row">
                <label class="col-sm-2">Input with success</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control is-valid">
                </div>
              </div>
              <div class="line"></div><br>
              <div class="mb-3 row">
                <label class="col-sm-2">Input with warning</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control is-invalid">
                </div>
              </div>
              <div class="line"></div><br>
              <div class="mb-3 row has-danger">
                <label class="col-sm-2">Input with error</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control is-invalid">
                  <div class="invalid-feedback">Read error message here.</div>
                </div>
              </div>
              <div class="line"></div><br>
              <div class="mb-3 row">
                <label class="col-sm-2">Control sizing</label>
                <div class="col-sm-10">
                  <div class="mb-3">
                    <input type="text" placeholder=".form-control-lg" class="form-control form-control-lg">
                  </div>
                  <div class="mb-3">
                    <input type="text" placeholder=".form-control" class="form-control">
                  </div>
                  <div class="mb-3">
                    <input type="text" placeholder=".form-control-sm" class="form-control form-control-sm">
                  </div>
                </div>
              </div>
              <div class="line"></div><br>
              <div class="mb-3 row">
                <label class="col-sm-2">Column sizing</label>
                <div class="col-sm-10">
                  <div class="row">
                    <div class="col-md-2">
                      <input type="text" placeholder=".col-md-2" class="form-control">
                    </div>
                    <div class="col-md-3">
                      <input type="text" placeholder=".col-md-3" class="form-control">
                    </div>
                    <div class="col-md-4">
                      <input type="text" placeholder=".col-md-4" class="form-control">
                    </div>
                  </div>
                </div>
              </div>
              <div class="line"></div><br>
              <div class="mb-3 row">
                <label class="col-sm-2">Input groups</label>
                <div class="col-sm-10">
                  <div class="mb-3">
                    <div class="input-group mb-3">
                      <span class="input-group-text" id="basic-addon1">@</span>
                      <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1">
                    </div>
                  </div>
                  <div class="mb-3">
                    <div class="input-group mb-3">
                      <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)">
                      <span class="input-group-text">.00</span>
                    </div>
                  </div>
                  <div class="mb-3">
                    <div class="input-group mb-3">
                      <span class="input-group-text">$</span>
                      <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)">
                      <span class="input-group-text">.00</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="line"></div><br>
              <div class="mb-3 row">
                <label class="col-sm-2">Button addons</label>
                <div class="col-sm-10">
                  <div class="mb-3">
                    <div class="input-group mb-3">
                      <button class="btn btn-primary" type="button" id="button-addon1">Go!</button>
                      <input type="text" class="form-control" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1">
                    </div>
                  </div>
                  <div class="mb-3">
                    <div class="input-group mb-3">
                      <input type="text" class="form-control" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon2">
                      <button class="btn btn-primary" type="button" id="button-addon2">Go!</button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="line"></div><br>
              <div class="mb-3 row">
                <div class="col-sm-4 offset-sm-2">
                  <button type="submit" class="btn btn-secondary mb-2"><i class="fas fa-times"></i> Cancel</button>
                  <button type="submit" class="btn btn-primary mb-2"><i class="fas fa-save"></i> Save</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
  name: 'Forms',
  computed: mapState(['routerPathCfg']),
  methods: {...mapActions(['showBar', 'hiddenBar'])},
  created () {
    console.log(this.routerPathCfg)
    this.hiddenBar()
    console.log('Forms.vue=  createdcreatedcreated..')
  },
  destroyed () {
    this.showBar()
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
