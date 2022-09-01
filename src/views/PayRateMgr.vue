<template>
  <div class="container">
    <form>
      <div class="alert alert-success">
        ກຳນົດອັດຕາຈ່າຍລາງວັນ {{ payRateList.length }}
      </div>

      <div class="form-group row card">
        <label for="roll_id" class="col-md-4 col-form-label"
          >ປະເພດເລກ:
          <span style="color: green">[ {{ catId }} ]</span>
        </label>
        <div class="col-md-12">
          <select
            class="form-select"
            aria-label="Default select example"
            :required="true"
            v-model="catId"
          >
            <option
              v-for="d in payRateList"
              v-bind:key="d.catId"
              :value="d.catId"
            >
              {{ d.catId }}
            </option>
          </select>
        </div>

        <label for="roll_id" class="col-md-4 col-form-label"
          >ເລກ 2 ໂຕ:
          <span style="color: green"
            >[ {{ formatNum(selPayrate.two) }} / 1,000 ]</span
          >
        </label>
        <div class="col-md-12">
          <input type="number" class="form-control" v-model="selPayrate.two" />
        </div>
        <label for="roll_id" class="col-md-4 col-form-label"
          >ເລກ 3 ໂຕ:
          <span style="color: green"
            >[ {{ formatNum(selPayrate.three) }} / 1,000 ]</span
          >
        </label>
        <div class="col-md-12">
          <input
            type="number"
            class="form-control"
            v-model="selPayrate.three"
          />
        </div>
        <label for="roll_id" class="col-md-4 col-form-label"
          >ເລກ 4 ໂຕ:
          <span style="color: green"
            >[ {{ formatNum(selPayrate.four) }} / 1,000 ]</span
          >
        </label>
        <div class="col-md-12">
          <input type="number" class="form-control" v-model="selPayrate.four" />
        </div>
        <label for="roll_id" class="col-md-4 col-form-label"
          >ເລກ 5 ໂຕ:
          <span style="color: green"
            >[ {{ formatNum(selPayrate.five) }} / 1,000 ]</span
          ></label
        >
        <div class="col-md-12">
          <input type="number" class="form-control" v-model="selPayrate.five" />
        </div>
        <label for="roll_id" class="col-md-4 col-form-label"
          >ເລກ 6 ໂຕ:
          <span style="color: green"
            >[ {{ formatNum(selPayrate.six) }} / 1,000 ]</span
          >
        </label>
        <div class="col-md-12">
          <input type="number" class="form-control" v-model="selPayrate.six" />
        </div>
        <label for="roll_id" class="col-md-4 col-form-label"
          >ເລກ ສູງ:
          <span style="color: green"
            >[ {{ formatNum(selPayrate.over) }} / 1,000 ]</span
          >
        </label>
        <div class="col-md-12">
          <input type="number" class="form-control" v-model="selPayrate.over" />
        </div>
        <label for="roll_id" class="col-md-4 col-form-label"
          >ເລກ ຕ່ຳ:
          <span style="color: green"
            >[ {{ formatNum(selPayrate.under) }} / 1,000 ]</span
          >
        </label>
        <div class="col-md-12">
          <input
            type="number"
            class="form-control"
            v-model="selPayrate.under"
          />
        </div>

        <label for="roll_id" class="col-md-4 col-form-label"></label>
        <div class="col-md-12">
          <button class="btn btn-success" @click.prevent="updatedata()">
            ບັນທຶກ
          </button>
        </div>
        <i class="fa fa-spinner fa-spin fa-3x fa-fw" v-if="isloading"></i>
        <p v-else-if="!isloading && error" style="color: red">{{ error }}</p>
      </div>
    </form>
  </div>
</template>
<script>
import axios from "axios";
import apiDomain from "../config";
export default {
  data() {
    return {
      isloading: false,
      error: null,
      catId: "",
      payRateList: [],
      // selPayrate:this.selPayrateComputed
      selPayrate: {
        two: 0,
        three: 0,
        four: 0,
        five: 0,
        six: 0,
        over: 0,
        under: 0,
      },
    };
  },
  watch: {
    catId(val) {
      this.selPayrate = this.payRateList.find((el) => el.catId === val) || {};
    },
  },

  methods: {
    async fetchpayrate() {
      this.isloading = true;
      this.error = null;
      try {
        let response = await axios.get(apiDomain.url + "getpayrate");
        response.data.map((el) => {
          this.payRateList.push({
            two: el.pay_two,
            three: el.pay_three,
            four: el.pay_four,
            five: el.pay_five,
            six: el.pay_six,
            over: el.over,
            under: el.under,
            catId: el.cat_id,
          });
          // this.catId = el.cat_id;
          (this.catId = "LA001")
        });
         (this.isloading = false);
      } catch (error) {
        this.error = error;
        this.isloading = false;
      }
    },

    updatedata() {
      var r = confirm("ຕ້ອງການແກ້ໄຂຂໍ້ມູນ?");
      if (r === true) {
        this.isloading = true;
        this.error = null;
        axios
          .put(apiDomain.url + `updatepayrate/?id=${this.catId}`, {
            two: this.selPayrate.two,
            three: this.selPayrate.three,
            four: this.selPayrate.four,
            five: this.selPayrate.five,
            six: this.selPayrate.six,
            over: this.selPayrate.over,
            under: this.selPayrate.under,
          })
          .then((res) => {
            alert(res.data);
            this.isloading = false;
          })
          .catch((er) => {
            this.isloading = false;
            this.error = er;
            alert("ເກີດຂໍ້ຜິດພາດ: " + er);
          });
      }
    },
    formatNum(val) {
      return new Intl.NumberFormat().format(val);
    },
  },
  async created() {
    await this.fetchpayrate();
  },
};
</script>
<style scoped>
.card {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  margin: 0.5rem auto;
  max-width: 40rem;
}
</style>