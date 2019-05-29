<template>
  <div>
    <b-container>
      <div class="text-center">
        <b-row>
          <b-col sm="2">
            <label>category:</label>
          </b-col>
          <b-col sm="7">
            <b-input v-validate="'required|alpha|length:1'" v-model="category" name="Category"></b-input>
            <span>{{ errors.first('Category') }}</span>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="2">
            <label>Users:</label>
          </b-col>
          <b-col sm="7">
            <!-- <b-form-checkbox value="English">{{this.users}}</b-form-checkbox> -->
            <b-input v-validate="'required'" v-model="users" name="Users"></b-input>
            <span>{{ errors.first('Users') }}</span>
          </b-col>
        </b-row>
        <br>
        <div class="text-center">
          <b-button variant="success" @click="putDt()">Submit</b-button>
        </div>
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
      category: "",
      users: ""
    };
  },
  mounted() {
    this.getData(this.$route.params.Id);
  },
  methods: {
    putDt: function() {
      if (!this.category || !this.users) {
        this.$validator
          .validateAll()
          .then(result => {
            if (!result) {
              alert("Enter All Details");
              return;
            }
            // alert("success");
          })
          .catch(() => {});
      } else {
        const id = this.$route.params.Id;
        const data = {
          Category: this.category,
          Users: this.users
        };
        return axios
          .put(`http://localhost:5000/api/updtcategoreies/${id}`, data)
          .then(response => {
            console.log(response.data);
            this.$router.push("/main");
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    getData: function() {
      const id = this.$route.params.Id;
      return axios
        .get(`http://localhost:5000/api/getctId/${id}`)
        .then(response => {
          console.log(response.data);
          this.arr = response.data;
          this.category = this.arr[0].Category;
          this.users = this.arr[0].Users;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style>
</style>
