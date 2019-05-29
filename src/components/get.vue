<template>
  <div>
    <br>
    <b-container>
      <div class="text-center">
        <b-row>
          <b-col sm="5">
            <b-input
              v-validate="'required|alpha|length:1'"
              type="text"
              name="category"
              placeholder="Enter Category"
              v-model="categoryvlu"
            ></b-input>
            <span>{{ errors.first('category') }}</span>
          </b-col>
          <b-col sm="0">
            <b-button v-b-modal.modal-scoped variant="info" @click="listdt()">Go</b-button>
          </b-col>
        </b-row>
      </div>
    </b-container>
    <template>
      <div v-if="showpopup">
        <b-modal id="modal-scoped">
          <table class="table">
            <thead>
              <tr>
                <th>
                  <b-form-checkbox v-model="selectAll"></b-form-checkbox>
                </th>
                <th>EmpId</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="x in arr" :key="x.EmpId">
                <td>
                  <b-form-checkbox :value="x" v-model="checkedNames"></b-form-checkbox>
                </td>
                <td>{{x.EmpId}}</td>
                <td>{{x.Name}}</td>
              </tr>
            </tbody>
          </table>
          <template slot="modal-footer">
            <b-button size="sm" variant="success" @click="postData()">Add</b-button>
            <b-button size="sm" variant="danger" @click="checkedNames=[],cancel()">Cancel</b-button>
          </template>
        </b-modal>
      </div>
    </template>
    <br>
    <br>
    <b-container>
      <div class="text-Center" v-if="loaddata && list.length!==0">
        <!-- <h1 class="text-center">List</h1> -->
        <table class="table">
          <thead>
            <tr>
              <th>CategoryId</th>
              <th>Category</th>
              <th>User</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(x,index) in list" :key="index">
              <td>{{x.CategoryId}}</td>
              <td>{{x.Category}}</td>
              <td>{{x.Users}}</td>
              <td>
                <b-button variant="primary" @click="putDt(x.CategoryId)">Edit</b-button>
              </td>
              <td>
                <b-button variant="danger" @click="deleteDt(x.CategoryId,index)">-</b-button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      arr: [],
      form: {
        Name: "",
        Email: "",
        MobileNo: "",
        Age: "",
        Address: "",
        Password: ""
      },
      checkedNames: [],
      list: [],
      loaddata: false,
      categoryvlu: "",
      showpopup: false
    };
  },
  mounted() {
    this.listcategories();
  },
  computed: {
    selectAll: {
      get: function() {
        return this.arr ? this.checkedNames.length == this.arr.length : false;
      },
      set: function(value) {
        var checkedNames = [];

        if (value) {
          this.arr.forEach(function(user) {
            this.checkedNames.push(user.EmpId);
          });
        }
        this.checkedNames = checkedNames;
      }
    }
  },
  methods: {
    listdt: function() {
      if (!this.categoryvlu) {
        this.$validator
          .validateAll()
          .then(result => {
            if (!result) {
              alert("Enter Category");
              return;
            }
            // alert("success");
          })
          .catch(() => {});
      } else {
        this.showpopup = true;
        return axios
          .get("http://localhost:5000/api/get")
          .then(response => {
            console.log(response.data);
            this.arr = response.data;
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    cancel: function() {
      this.$bvModal.hide("modal-scoped");
    },
    listcategories: function() {
      console.log("get");
      return axios
        .get("http://localhost:5000/api/getlist")
        .then(response => {
          this.list = response.data;
          //console.log(this.list);
          if (this.list.length !== 0) {
            this.loaddata = true;
          }
          //else {
          //   this.loaddata = false;
          // }
        })
        .catch(err => {
          console.log(err);
        });
    },
    postData: function() {
      const data = {
        Category: this.categoryvlu,
        Users: this.checkedNames
      };
      return axios
        .post("http://localhost:5000/api/postcategories", data)
        .then(response => {
          console.log(response);
          this.$bvModal.hide("modal-scoped");
          this.list.push(data);
          // this.listdt();
          //this.$router.go();
        })
        .catch(err => {
          console.log(err);
        });
    },
    deleteDt: function(Id, index) {
      return axios
        .delete(`http://localhost:5000/api/deleteId/${Id}`)
        .then(response => {
          console.log(response);
          this.list.splice(index, 1);
        })
        .catch(err => {
          console.log(err);
        });
    },
    putDt: function(Id) {
      this.$router.push(`/edit/${Id}`);
    }
  }
};
</script>

<style>
</style>
