<template>
  <div class="container">
    <div class="page-title">
      <h3>Tables</h3>
    </div>
    <div class="row">
      <div class="col-md-12 col-lg-12">
        <div class="card">
          <div class="card-header">Basic Table</div>
          <div class="card-body">
            <p class="card-title">Add class <code>.table</code> inside table element</p>
            <div class="table-responsive">
              <table class="table">
                <thead>
                <tr>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Username</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Larry</td>
                  <td>the Bird</td>
                  <td>@twitter</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-12 col-lg-12">
        <div class="card">
          <div class="card-header">Stripe Table</div>
          <div class="card-body">
            <p class="card-title">Add class <code>.table-striped</code> inside table element</p>
            <div class="table-responsive">
              <table class="table table-striped">
                <thead>
                <tr>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Username</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Larry</td>
                  <td>the Bird</td>
                  <td>@twitter</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-12 col-lg-12">
        <div class="card">
          <div class="card-header">Basic DataTables Table</div>
          <div class="card-body">
            <p class="card-title"></p>
            <table class="table table-hover" id="dataTables-example" width="100%">
              <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Salary</th>
                <th>Country</th>
                <th>City</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>1</td>
                <td>Dakota Rice</td>
                <td>$36,738</td>
                <td>United States</td>
                <td>Oud-Turnhout</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Minerva Hooper</td>
                <td>$23,789</td>
                <td>Curaçao</td>
                <td>Sinaai-Waas</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Sage Rodriguez</td>
                <td>$56,142</td>
                <td>Netherlands</td>
                <td>Baileux</td>
              </tr>
              <tr>
                <td>4</td>
                <td>Philip Chaney</td>
                <td>$38,735</td>
                <td>Korea, South</td>
                <td>Overland Park</td>
              </tr>
              <tr>
                <td>5</td>
                <td>Doris Greene</td>
                <td>$63,542</td>
                <td>Malawi</td>
                <td>Feldkirchen in Kärnten</td>
              </tr>
              <tr>
                <td>6</td>
                <td>Mason Porter</td>
                <td>$78,615</td>
                <td>Chile</td>
                <td>Gloucester</td>
              </tr>
              <tr>
                <td>7</td>
                <td>Allisa Sanches</td>
                <td>$28,615</td>
                <td>Columbia</td>
                <td>Nigger</td>
              </tr>
              <tr>
                <td>8</td>
                <td>Peter Benhams</td>
                <td>$33,215</td>
                <td>Ecuador</td>
                <td>Holster</td>
              </tr>
              <tr>
                <td>9</td>
                <td>Bramson Adams</td>
                <td>$109,222</td>
                <td>Philippines</td>
                <td>Camp John</td>
              </tr>
              <tr>
                <td>10</td>
                <td>Jessie Williams</td>
                <td>$55,123</td>
                <td>Malaysia</td>
                <td>Glosterine</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="col-md-12 col-lg-12">
        <div class="card">
          <div class="card-header">Bordered Table</div>
          <div class="card-body">
            <p class="card-title">Add class <code>.table-bordered</code> for borders on all sides of the table and cells.</p>
            <div class="table-responsive">
              <table class="table table-bordered">
                <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">First</th>
                  <th scope="col">Last</th>
                  <th scope="col">Handle</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Larry the Bird</td>
                  <td>Gogles</td>
                  <td>@twitter</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-12 col-lg-12">
        <div class="card">
          <div class="card-header">Compact Table</div>
          <div class="card-body">
            <p class="card-title">Add class <code>.table-sm </code> to make tables more compact by cutting cell padding in half.</p>
            <div class="table-responsive">
              <table class="table table-sm">
                <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">First</th>
                  <th scope="col">Last</th>
                  <th scope="col">Handle</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Larry the Bird</td>
                  <td>Gogles</td>
                  <td>@twitter</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'Tables',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
