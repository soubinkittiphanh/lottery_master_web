<template>
  <div class="container card">
    <div class="row">
      <div class="col-md-8">
        <form>
          <div class="alert alert-success">
            ກຳນົດເລກເຕັມຮູ {{ $store.getters.co_code }} 
          </div>
          <div class="form-group row">
            <label for="roll_id" class="col-md-4 col-form-label"
              >ປະເພດເລກ:</label
            >
            <div class="col-md-12">
              <select
                class="custom-select"
                aria-label="Default select example"
                :required="true"
                v-model="category"
              >
                <option
                  v-for="d in categoryList"
                  v-bind:key="d.catId"
                  :value="d.category_id"
                >
                  {{ d.category_id }} | {{ d.category_name }}
                </option>
              </select>
              <span v-if="!formvalidate.ref" class="error"
                >ກະລຸນາໃສ່ປະເພດເລກ !!</span
              >
            </div>
            <label for="roll_id" class="col-md-4 col-form-label"
              >ເລກ 2 ໂຕ:
              <span style="color: red">[ {{ expres.two }} ]</span></label
            >
            <div class="col-md-12">
              <input type="number" class="form-control" v-model="two" />
            </div>
            <label for="roll_id" class="col-md-4 col-form-label"
              >ເລກ 3 ໂຕ:
              <span style="color: red">[ {{ expres.three }} ]</span></label
            >
            <div class="col-md-12">
              <input type="number" class="form-control" v-model="three" />
            </div>
            <label for="roll_id" class="col-md-4 col-form-label"
              >ເລກ 4 ໂຕ:
              <span style="color: red">[ {{ expres.four }} ]</span></label
            >
            <div class="col-md-12">
              <input type="number" class="form-control" v-model="four" />
            </div>
            <label for="roll_id" class="col-md-4 col-form-label"
              >ເລກ 5 ໂຕ:
              <span style="color: red">[ {{ expres.five }} ]</span></label
            >
            <div class="col-md-12">
              <input type="number" class="form-control" v-model="five" />
            </div>
            <label for="roll_id" class="col-md-4 col-form-label"
              >ເລກ 6 ໂຕ:
              <span style="color: red">[ {{ expres.six }} ]</span></label
            >
            <div class="col-md-12">
              <input type="number" class="form-control" v-model="six" />
            </div>
            <label for="roll_id" class="col-md-4 col-form-label"
              >ເລກ ສູງ:
              <span style="color: red">[ {{ expres.over }} ]</span></label
            >
            <div class="col-md-12">
              <input type="number" class="form-control" v-model="over" />
            </div>
            <label for="roll_id" class="col-md-4 col-form-label"
              >ເລກ ຕ່ຳ:
              <span style="color: red">[ {{ expres.under }} ]</span></label
            >
            <div class="col-md-12">
              <input type="number" class="form-control" v-model="under" />
            </div>
            <label for="roll_id" class="col-md-4 col-form-label"></label>
            <div class="col-md-12">
              <button class="btn btn-success" @click.prevent="updatedata">
                ບັນທຶກ
              </button>
            </div>
            <i class="fa fa-spinner fa-spin fa-3x fa-fw" v-if="isloading"></i>
            <p v-else-if="!isloading && error" style="color: red">
              {{ error }}
            </p>
          </div>
        </form>
      </div>
      <div class="col-md-4">
        <div class="card">
          <table
            class="table table-striped table-sm"
            id="branchreport"
            v-if="$store.getters.isMaster == 1"
          >
            <thead>
              <tr>
                ຍອດຂາຍ Topsale
              </tr>
              <tr>
                <th scope="col">ເລກສ່ຽງ</th>
                <th scope="col">ຍອດຂາຍ</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="d in topsale" v-bind:key="d.num">
                <td>{{ String(formatNum(d.num)) }}</td>
                <td>{{ String(formatNum(d.saletotal)) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- {{$store.getters.isMaster}} -->
    <table
      class="table table-striped table-sm"
      id="branchreport"
      v-if="$store.getters.isMaster == 1"
    >
      <thead>
        <tr>
          <th scope="col">ສາຂາ</th>
          <th scope="col">2 ໂຕ</th>
          <th scope="col">3 ໂຕ</th>
          <th scope="col">4 ໂຕ</th>
          <th scope="col">5 ໂຕ</th>
          <th scope="col">6 ໂຕ</th>
          <th scope="col">ຍົກເລີກ</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="d in allBrachNeck" v-bind:key="d.brc">
          <td>{{ d.brc || "Master " }}</td>
          <td>{{ String(formatNum(d.two)) }}</td>
          <td>{{ String(formatNum(d.three)) }}</td>
          <td>{{ String(formatNum(d.four)) }}</td>
          <td>{{ String(formatNum(d.five)) }}</td>
          <td>
            {{ String(formatNum(d.six)) }}
          </td>
          <td>
            <button class="btn btn-warning" @click="cancel(d.brc)">
              ຍົກເລີກ
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import axios from "axios";
import apiDomain from "../config";
export default {
  data() {
    return {
      category: "LA001",
      isloading: false,
      error: null,
      two: 0,
      three: 0,
      four: 0,
      five: 0,
      six: 0,
      over: 0,
      under: 0,
      categoryList: [],
      expres: {
        two: 0,
        three: 0,
        four: 0,
        five: 0,
        six: 0,
        over: 0,
        under: 0,
      },
      allBrachNeck: [],
      topsale: [],
      formvalidate: {
        ref: false,
        date: false,
      },
    };
  },
  watch: {
    two(val) {
      this.expres.two = this.formatNum(val);
    },
    three(val) {
      this.expres.three = this.formatNum(val);
    },
    four(val) {
      this.expres.four = this.formatNum(val);
    },
    five(val) {
      this.expres.five = this.formatNum(val);
    },
    six(val) {
      this.expres.six = this.formatNum(val);
    },
    over(val) {
      this.expres.over = this.formatNum(val);
    },
    under(val) {
      this.expres.under = this.formatNum(val);
    },
  },
  methods: {
    async fetchCategory() {
      let response = await axios.get(apiDomain.url + "category_f");
      try {
        let responseData = response.data;
        for (let index = 0; index < responseData.length; index++) {
          const element = responseData[index];
          console.log(element);
          this.categoryList.push(element);
        }
        console.log("Category len: " + response.data.length);
      } catch (error) {
        console.log("Error fetching category: " + error);
      }
    },
    fetchsalelim() {
      this.isloading = true;
      this.error = null;
      axios
        .get(
          apiDomain.url + "getsalelimit/?brc_id=" + this.$store.getters.co_code
        )
        .then((res) => {
          this.two = res.data[0].two_digits;
          this.three = res.data[0].three_digits;
          this.four = res.data[0].four_digits;
          this.five = res.data[0].five_digits;
          this.six = res.data[0].six_digits;
          this.over = res.data[0].lim_over;
          this.under = res.data[0].lim_under;
          this.isloading = false;
        })
        .catch((err) => {
          this.error = err;
          this.isloading = false;
        });
    },
    fetchAllBranch() {
      this.isloading = true;
      this.error = null;
      axios
        .get(apiDomain.url + "getsalelimit/")
        .then((res) => {
          this.allBrachNeck = res.data.map((el) => {
            return {
              brc: el.brc_code,
              two: el.two_digits,
              three: el.three_digits,
              four: el.four_digits,
              five: el.five_digits,
              six: el.six_digits,
            };
          });

          this.isloading = false;
        })
        .catch((err) => {
          this.error = err;
          this.isloading = false;
          // alert(err);
        });
    },
    updatedata() {
      var r = confirm("ຕ້ອງການແກ້ໄຂຂໍ້ມູນ?");
      if (r === true) {
        this.isloading = true;
        this.error = null;
        axios
          .put(apiDomain.url + "updatesalelim/?id=" + 1, {
            two: this.two,
            three: this.three,
            four: this.four,
            five: this.five,
            six: this.six,
            over: this.over,
            under: this.under,
            brc_id:
              this.$store.getters.co_code == "POPPY"
                ? "DEFAULT"
                : this.$store.getters.co_code,
          })
          .then((res) => {
            alert(res.data);
            this.fetchsalelim();
            this.fetchAllBranch();
            this.isloading = false;
          })
          .catch((er) => {
            this.isloading = false;
            this.error = null;
            alert("ເກີດຂໍ້ຜິດພາດ: " + er);
          });
      }
    },
    cancel(brc_code) {
      const conf = confirm(
        "ຕ້ອງການຍົກເລີກ ແລະ ສາຂານີ້ ຈະມີການດຶງ ຍອດເຕັມຮູບຈາກສາຂາ POPPY ?"
      );
      if (!conf) return;
      this.isloading = true;
      this.error = null;
      axios
        .put(apiDomain.url + "cancelsalelim/", { brc_code: brc_code })
        .then((res) => {
          alert(res.data);
          this.fetchsalelim();
          this.fetchAllBranch();
          this.isloading = false;
        })
        .catch((err) => {
          this.error = err;
          this.isloading = false;
          // alert(err);
        });
    },
    fetchTopSale() {
      this.isloading = true;
      this.error = null;
      axios
        .get(apiDomain.url + "topsale/")
        .then((res) => {
          this.topsale = res.data.map((el) => {
            return {
              num: el.luck_num,
              saletotal: el.total_sale,
            };
          });
          this.isloading = false;
        })
        .catch((err) => {
          this.error = err;
          this.isloading = false;
          // alert(err);
        });
    },
    formatNum(val) {
      return new Intl.NumberFormat().format(val);
    },
  },
  created() {
    this.fetchsalelim();
    this.fetchAllBranch();
    this.fetchTopSale();
    this.fetchCategory();
  },
};
</script>
<style scoped>
.card {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  margin: 0.5rem auto;
  max-width: 60rem;
}
</style>