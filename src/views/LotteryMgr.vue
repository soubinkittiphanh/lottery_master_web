<template>
  <div class="container">
    <form>
      <div class="form-group row">
        <label for="roll_id" class="col-md-4 col-form-label">ງວດທີ:</label>
        <div class="col-md-12">
          <input
            disabled
            type="text"
            class="form-control"
            v-model="ism_ref"
            :style="!formvalidate.ref ? errorclass : ''"
          />
          <span v-if="!formvalidate.ref" class="error"
            >ກະລຸນາໃສ່ເລກທີງວດ !!</span
          >
        </div>
        <label for="roll_id" class="col-md-4 col-form-label">ປະເພດເລກ:</label>
        <div class="col-md-12">
          <select
            class="custom-select"
            aria-label="Default select example"
            :required="true"
            v-model="ism_category"
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
          >ອອກວັນທີ:
          <span class="succeed">
            {{ dateVisible }}
          </span>
        </label>
        <div class="col-md-12">
          <input
            type="date"
            class="form-control"
            v-model="date"
            format="dd-mm-yyyy"
            :style="!formvalidate.date ? errorclass : ''"
          />
          <span v-if="!formvalidate.date" class="error"
            >ວັນທີບໍ່ຖືກຕ້ອງ !!</span
          >
        </div>
        <label for="roll_id" class="col-md-4 col-form-label"
          >ເວລາອອກລາງວັນ:</label
        >
        <div class="col-md-12">
          <div class="row">
            <div class="col-sm-4">
              <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">hh</span>
                <select class="custom-select" :required="true" v-model="selHH">
                  <option
                    v-for="d in ism_endtime.hour"
                    v-bind:key="d"
                    :value="d"
                  >
                    {{ d }}
                  </option>
                </select>
              </div>
            </div>
            <div class="col-sm-4">
              <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">mn</span>
                <select class="custom-select" :required="true" v-model="selMN">
                  <option v-for="d in ism_endtime.mn" v-bind:key="d" :value="d">
                    {{ d }}
                  </option>
                </select>
              </div>
            </div>
            <div class="col-sm-4">
              <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">sec</span>
                <select class="custom-select" :required="true" v-model="selSC">
                  <option v-for="d in ism_endtime.sc" v-bind:key="d" :value="d">
                    {{ d }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <label for="roll_id" class="col-md-4 col-form-label"
          >ຜົນອອກລາງວັນ ບົນ:</label
        >
        <div class="col-md-12">
          <input
            type="number"
            class="form-control"
            placeholder="[ບົນ] 6 ຕົວ"
            v-model="ism_res_pr"
          />
        </div>
        <label for="roll_id" class="col-md-4 col-form-label"
          >ຜົນອອກລາງວັນ ລ່າງ:</label
        >
        <div class="col-md-12">
          <input
            type="number"
            class="form-control"
            placeholder="[ລ່າງ] 6 ຕົວ"
            v-model="ism_res_sec"
          />
        </div>
        <label for="roll_id" class="col-md-4 col-form-label"
          >ຜົນອອກລາງວັນ ບົນ ສູງ/ຕ່ຳ:</label
        >
        <div class="col-md-12">
          <input
            type="text"
            class="form-control"
            placeholder="ເລກຜົນອອກຕ້ອງໃສ່ o ຫລື u ຕົວ"
            v-model="ism_res_pr_ou"
          />
        </div>
        <label for="roll_id" class="col-md-4 col-form-label"
          >ຜົນອອກລາງວັນ ລ່າງ ສູງ/ຕ່ຳ:</label
        >
        <div class="col-md-12">
          <input
            type="text"
            class="form-control"
            placeholder="ເລກຜົນອອກຕ້ອງໃສ່ o ຫລື u ຕົວ"
            v-model="ism_res_sec_ou"
          />
        </div>

        <div class="col-md-12">
          <label for="exampleFormControlTextarea1">Remark</label>
          <textarea
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            v-model="ism_remark"
          ></textarea>
        </div>
        <label class="col-md-4 col-form-label">ສະຖານະງວດ</label>
        <div class="col-md-12">
          <button
            class="btn btn-danger btn-block"
            @click.prevent="triggleSwitch"
          >
            {{ isopen ? "ເປີດ" : "ປິດ" }}
          </button>
        </div>

        <!-- <div class="col-md-12"></div> -->
        <div class="col-md-12 custom-control custom-switch">
          <input
            v-model="isopen"
            type="checkbox"
            class="custom-control-input"
            id="customSwitch1"
            @click="triggleSwitch"
          />
          <label
            class="custom-control-label"
            for="customSwitch1"
            style="float: right"
            >ປິດ-ເປິດ</label
          >
        </div>
        <div class="col-md-12">
          <button class="btn btn-success mr-2" @click.prevent="saveism(issave)">
            {{ issave ? "ບັນທຶກ" : "ເພີ່ມງວດ" }}
          </button>
          <button class="btn btn-danger" v-if="issave" @click="toggleSave">
            ຍົກເລີກ
          </button>
        </div>
      </div>
    </form>
    <hr />
    <button @click="fetchdata" class="btn btn-warning">ດຶງຂໍ້ມູນ</button>
    <hr />
    <i class="fa fa-spinner fa-spin fa-3x fa-fw" v-if="isLoading"></i>
    <p v-else-if="!isLoading && error" style="color: red">{{ error }}</p>
    <p v-else-if="ismdata.length < 1">ຍັງບໍ່ມີງວດ</p>
    <base-card v-for="(itm, idx) in ismdata" :key="idx">
      <span style="color: green"> [ ຜົນອອກ:{{ itm.ism_res_pr }} ]</span>
      [ປະເພດ: {{itm.ism_category}} ເລກທີ: {{ itm.ism_ref }} ] [ ອອກວັນທີ: {{ formatdate(itm.ism_date) }} {{itm.ism_end_time}}]
      <switch-toggle
        :is-open="itm.ism_active === 1 ? true : false"
        :name="'customSwitch' + itm.ism_id"
      >
      </switch-toggle>
      <button
        class="btn btn-warning"
        @click="
          editism(
            itm
          )
        "
      >
        ແກ້ໄຂ
      </button>
    </base-card>
    <div>
      <ul></ul>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import apiDomain from "../config";
import BaseCard from "../components/ui/BaseCard";
import SwitchToggle from "../components/ui/SwitchToggle";
var moment = require("moment");
export default {
  components: {
    BaseCard,
    SwitchToggle,
  },
  data() {
    return {
      selHH: "00",
      selMN: "00",
      selSC: "00",
      moment: moment,
      errorclass: "border:1px solid red;",
      ism_ref: "",
      ism_category: "LA001",
      categoryList: [],
      date: "",
      dateVisible: "",
      ism_res_pr: "",
      ism_res_sec: "",
      ism_res_pr_ou: "",
      ism_res_sec_ou: "",
      ism_remark: "",
      ism_endtime: {
        hour: [],
        mn: [],
        sc: [],
      },
      isopen: false,
      issave: false,
      ismdata: [],
      ismId: "",
      isLoading: false,
      error: null,
      formvalidate: {
        ref: false,
        date: false,
      },
    };
  },
  watch: {
    ism_ref(val) {
      console.log("changing....");
      console.log("Val: " + val);
      console.log("Leng: " + val.toString().length);
      if (val.toString().length > 0) {
        this.formvalidate.ref = true;
      } else {
        this.formvalidate.ref = false;
      }
    },
    date(val) {
      this.setismdate(val);
      if (val.length > 0) {
        this.formvalidate.date = true;
      } else {
        this.formvalidate.date = false;
      }
    },
  },
  methods: {
    genTimeComponet() {
      let tempHH = [];
      let i = 0;
      while (i < 24) {
        if (i > 9) {
          tempHH.push(`${i}`);
        } else {
          tempHH.push(`0${i}`);
        }
        i++;
      }
      console.log("HH:" + tempHH[0]);
      this.ism_endtime.hour = tempHH;
      this.genMn();
    },
    genMn() {
      let tempMn = [];
      let i = 0;
      while (i < 60) {
        if (i > 9) {
          tempMn.push(`${i}`);
        } else {
          tempMn.push(`0${i}`);
        }
        i++;
      }
      console.log("HH:" + tempMn[0]);
      this.ism_endtime.mn = tempMn;
      this.genSec();
    },
    genSec() {
      let tempSc = [];
      let i = 0;
      while (i < 60) {
        if (i > 9) {
          tempSc.push(`${i}`);
        } else {
          tempSc.push(`0${i}`);
        }
        i++;
      }
      console.log("HH:" + tempSc[0]);
      this.ism_endtime.sc = tempSc;
    },
    gen_ism_ref() {
      console.log("Sending");
      this.isLoading = true;
      this.error = null;
      axios
        .get(apiDomain.url + "ismref")
        .then((res) => {
          this.ism_ref = res.data;
          this.isLoading = false;
        })
        .catch((er) => {
          this.error = er;
        });
    },
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
    formatdate(date) {
      var dateVisible = new Date(date);
      var m = "" + (dateVisible.getMonth() + 1);
      var d = "" + dateVisible.getDate();
      if (m.length < 2) {
        m = "0" + m;
      }
      if (d.length < 2) {
        d = "0" + d;
      }
      dateVisible = d + "-" + m + "-" + dateVisible.getFullYear();
      console.log(dateVisible);
      return dateVisible; //"this.dateVisible";
    },
    editism(itm) {
      var r = confirm("ຕ້ອງການແກ້ໄຂຂໍ້ມູນ?");
      if (r == true) {
        this.ismId = itm.ism_id;
        this.ism_ref = itm.ism_ref;
        this.ism_res_pr = itm.ism_res_pr;
        this.ism_res_sec = itm.ism_res_sec;
        this.ism_res_pr_ou = itm.ism_res_pr_ou;
        this.ism_res_sec_ou = itm.ism_res_sec_ou;
        this.ism_remark = itm.ism_remark;
        this.selHH = itm.ism_end_time.split(":")[0];
        this.selMN = itm.ism_end_time.split(":")[1];
        this.selSC = itm.ism_end_time.split(":")[2];
        this.ism_category=itm.ism_category
        this.setismdate(itm.ism_date);
        this.isopen = itm.ism_active === 1 ? true : false;
        this.issave = true;
      } else {
        this.issave = false;
      }
    },
    setismdate(dateinput) {
      var date = new Date(dateinput);
      var m = "" + (date.getMonth() + 1);
      var d = "" + date.getDate();
      if (m.length < 2) {
        m = "0" + m;
      }
      if (d.length < 2) {
        d = "0" + d;
      }
      this.date = date.getFullYear() + "-" + m + "-" + d;
    },
    callFunction() {
      var fuldate = new Date();
      var m = "" + (fuldate.getMonth() + 1);
      var d = "" + fuldate.getDate();
      if (m.length < 2) {
        m = "0" + m;
      }
      if (d.length < 2) {
        d = "0" + d;
      }
      this.date = fuldate.getFullYear() + "-" + m + "-" + d;
    },
    triggleSwitch() {
      this.isopen = !this.isopen;
    },
    saveism(val) {
      if (this.isopen && this.ism_res) {
        return alert("ເລກອອກແລ້ວກະລຸນາປິດງວດ");
      }
      if (val === true) {
        console.log("update");
        !this.formvalidate.ref || !this.formvalidate.date
          ? alert("ຂໍ້ມູນບໍ່ຖືກຕ້ອງ ກວດສອບຂໍ້ມູນໃຫ້ຄົບຖ້ວນ")
          : this.getdataSurvey("update");
      } else {
        !this.formvalidate.ref || !this.formvalidate.date
          ? alert("ຂໍ້ມູນບໍ່ຖືກຕ້ອງ ກວດສອບຂໍ້ມູນໃຫ້ຄົບຖ້ວນ")
          : this.createIsm();
      }
    },
    createIsm() {
      this.isLoading = true;
      this.error = null;
      console.log("ISM OU PR: "+this.ism_res_pr_ou);
      axios
        .post(apiDomain.url + "createism", {
          ism_ref: this.ism_ref,
          ism_category: this.ism_category,
          ism_date: this.date,
          ism_res_pr: this.ism_res_pr,
          ism_res_sec: this.ism_res_sec,
          ism_res_pr_ou: this.ism_res_pr_ou,
          ism_res_sec_ou: this.ism_res_sec_ou,
          ism_remark: this.ism_remark,
          ism_endtime: this.selHH + ":" + this.selMN + ":" + this.selSC,
          ism_active: this.isopen,
        })
        .then((res) => {
          console.log(res);
          alert(res.data);
          this.fetchdata();
          this.isLoading = false;
        })
        .catch((err) => {
          // console.log(err);
          this.error = err;
        });
    },
    resetInput() {
      this.issave = false;
      this.isopen = false;
      this.ism_ref = "";
      this.ism_res = "";
      this.ismId = "";
      this.gen_ism_ref();
    },
    updateIsm() {
      // console.log(this.ismId);
      this.isLoading = true;
      this.error = null;
      axios
        .put(apiDomain.url + "updateism", {
          ism_ref: this.ism_ref,
          ism_category: this.ism_category,
          ism_date: this.date,
          ism_res_pr: this.ism_res_pr,
          ism_res_sec: this.ism_res_sec,
          ism_res_pr_ou: this.ism_res_pr_ou,
          ism_res_sec_ou: this.ism_res_sec_ou,
          ism_remark: this.ism_remark,
          ism_endtime: this.selHH + ":" + this.selMN + ":" + this.selSC,
          ism_active: this.isopen,
          ism_id: this.ismId, //this.ismId,
        })
        .then((response) => {
          // console.log(ism_id);
          alert(response.data);
          this.resetInput();
          this.fetchdata();
          this.isLoading = false;
        })
        .catch((err) => {
          this.error = err;
          console.log(err.data);
        });
    },
    getdataSurvey(action) {
      console.log(this.date);
      this.isLoading = true;
      this.error = null;
      const url = apiDomain.url + "fetchism/?date=" + this.date;
      axios
        .get(url)
        .then((res) => {
          if (action === "create") {
            if (res.data.length > 0) {
              alert("ວັນທີ ທີ່ເລືອກ ມີງວດທີ່ໃຊ້ງານຢູ່");
              this.fetchdata();
            } else {
              // alert("Ready to insert");
              this.createIsm();
            }
          } else {
            // if (res.data.length > 1) {
            //   alert("ວັນທີ ເປີດງວດທີ່ເລືອກ ມີງວດທີ່ໃຊ້ງານຢູ່");
            //   this.fetchdata();
            // } else {
              // alert("Ready to update");
              this.updateIsm();
            // }
          }
          this.isLoading = false;
          console.log(res.data);
        })
        .catch((err) => {
          // alert(err);
          this.error = err;
        });
    },
    toggleSave() {
      this.issave = false;
      this.ism_ref = "";
      this.ism_res = "";
      this.isopen = false;
      this.gen_ism_ref();
    },
    fetchdata() {
      this.isLoading = true;
      this.error = null;
      this.ismdata = "";
      console.log(this.date);
      const url = apiDomain.url + "fetchism/?date=" + this.date;
      axios
        .get(url)
        .then((res) => {
          const result = [];
          for (const id in res.data) {
            console.log("endtime: "+res.data[id].end_time);
            result.push({
              ism_id: res.data[id].id,
              ism_ref: res.data[id].ism_ref,
              ism_date: res.data[id].ism_date,
              ism_res_pr: res.data[id].ism_result_primary,
              ism_res_sec: res.data[id].ism_result_secondary,
              ism_res_pr_ou: res.data[id].ism_result_primary_ou,
              ism_res_sec_ou: res.data[id].ism_result_secondary_ou,
              ism_remark: res.data[id].remark,
              ism_end_time: res.data[id].end_time||"00:00:00",
              ism_category: res.data[id].cat_id,
              ism_active: res.data[id].ism_active,
            });
          }
          this.ismdata = result;
          console.log(res.data);
          this.isLoading = false;
        })
        .catch((err) => {
          alert(err);
          this.error = err;
          this.isLoading = false;
        });
    },
  },
  filters: {
    moment: function (date) {
      return moment(date).format("MMMM Do YYYY, h:mm:ss a");
    },
  },
  mounted() {
    console.log("mounted =>");
    this.callFunction();
    this.fetchdata();
    this.gen_ism_ref();
  },
  async created() {
    console.log("created =>");
    this.genTimeComponet();
    setTimeout(() => {
      console.log("Time is runing =>");
    }, 3000);
    await this.fetchCategory();
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
.error {
  /* border: 1px solid red; */
  color: red;
}
.succeed {
  /* border: 1px solid green; */
  color: green;
}
</style>
