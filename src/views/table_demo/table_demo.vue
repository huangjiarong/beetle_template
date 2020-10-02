<template>
  <div class="app-container">

    <el-row>
      <el-col :span="24">
        <template v-if="table1Edit">
          <el-button
            type="success"
            size="small"
            icon="el-icon-plus"
            @click.native="saveTable1"
          >保存</el-button>
        </template>
        <template v-else>
          <el-button
            type="primary"
            size="small"
            icon="el-icon-plus"
            @click.native="handleTable1Edit"
          >编辑</el-button>
        </template>
        <el-button
          type="primary"
          size="small"
          icon="el-icon-document"
          @click.native="table1Pdf"
        >打印为pdf</el-button>
      </el-col>
    </el-row>
    <br>
    <el-table
      id="table1"
      :data="table1"
      style="width:1000px"
      border
      fit
      :show-header="false"
      :span-method="table1SpanMethod"
    >
      <el-table-column label="列1" align="center" width="500px">
        <template slot-scope="{row}">
          <span class="span_name">{{ row.col1.name }}</span>
          <template v-if="row.edit">
            <el-input v-model="row.col1.value" size="small" :type="row.type" autosize class="input_value" />
          </template>
          <template v-else>
            <span class="span_value">{{ row.col1.value }}</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="列2" align="center" width="500px">
        <template slot-scope="{row}">
          <span class="span_name">{{ row.col2.name }}</span>
          <template v-if="row.edit">
            <el-input v-model="row.col2.value" size="small" class="input_value" />
          </template>
          <template v-else>
            <span class="span_value">{{ row.col2.value }}</span>
          </template>
        </template>
      </el-table-column>
    </el-table>

    <br>

    <el-row>
      <el-col :span="24">
        <el-button
          type="primary"
          size="small"
          icon="el-icon-plus"
          @click.native="addTable2NewLine"
        >添加一行</el-button>
        <template v-if="table2Edit">
          <el-button
            type="success"
            size="small"
            icon="el-icon-plus"
            @click.native="saveTable2"
          >保存</el-button>
        </template>
        <template v-else>
          <el-button
            type="primary"
            size="small"
            icon="el-icon-plus"
            @click.native="handleTable2Edit"
          >编辑</el-button>
        </template>
      </el-col>
    </el-row>
    <br>
    <el-table
      id="table2"
      :key="tableKey"
      :data="table2"
      border
      fit
      style="width: 100%;"
    >
      <el-table-column label="课程教学目标及对毕业要求指标点的支撑" align="center">
        <el-table-column label="课程教学目标">
          <template slot-scope="{row}">
            <template v-if="row.edit">
              <el-input v-model="row.courseTarget.title" size="small" />
              <el-input v-model="row.courseTarget.desc" type="textarea" autosize size="small" />
            </template>
            <template v-else>
              <span><strong>{{ row.courseTarget.title }}</strong></span>
              <br>
              <span>{{ row.courseTarget.desc }}</span>
            </template>
          </template>
        </el-table-column>
        <el-table-column label="支撑毕业要求指标点">
          <template slot-scope="{row}">
            <template v-if="row.edit">
              <el-input v-model="row.indexPoint" type="textarea" autosize size="small" />
            </template>
            <template v-else>
              <span style="white-space:pre-wrap;">{{ row.indexPoint }}</span>
            </template>
          </template>
        </el-table-column>
        <el-table-column label="毕业要求">
          <template slot-scope="{row}">
            <template v-if="row.edit">
              <el-input v-model="row.requirments" type="textarea" autosize size="small" />
            </template>
            <template v-else>
              <span style="white-space:pre-wrap;">{{ row.requirments }}</span>
            </template>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column v-if="showOperation" label="操作" align="center">
        <template slot-scope="{row,$index}">
          <el-button
            type="primary"
            size="mini"
            plain
            icon="el-icon-edit"
            @click.native="showUpdateDialog(row)"
          > 保存 </el-button>
          <el-button
            type="danger"
            size="mini"
            plain
            icon="el-icon-delete"
            @click.native="deleteTable2(row, $index)"
          > 删除 </el-button>
        </template>
      </el-table-column>
    </el-table>

    <br>

    <el-row>
      <el-col :span="24">
        <el-button
          type="primary"
          size="small"
          icon="el-icon-plus"
        >添加一行</el-button>
        <template v-if="table3Edit">
          <el-button
            type="success"
            size="small"
            icon="el-icon-plus"
          >保存</el-button>
        </template>
        <template v-else>
          <el-button
            type="primary"
            size="small"
            icon="el-icon-plus"
            @click.native="handleTable3Edit"
          >编辑</el-button>
        </template>
      </el-col>
    </el-row>
    <br>
    <el-table
      id="table3"
      :data="table3"
      border
      fit
      style="width: 100%;"
      :span-method="table3SpanMethod"
    >
      <el-table-column label="课程考核" align="center">
        <el-table-column label="序号" width="80px">
          <template slot-scope="{row}">
            <template v-if="row.id===-3">
              <span>系(部)审查意见: </span>
              <br>
              <br>
              <span style="margin-left: 80px;">经审核, 本大纲的内容和格式均符合要求</span>
              <br>
              <br>
              <el-form :label-position="right" style="float:right;width: 200px;">
                <el-form-item label="西部主任签名: " style="margin-bottom:0">
                  <span> 发发发 </span>
                </el-form-item>
                <el-form-item label="日期: " style="margin-bottom:0;">
                  <span> jfdkslajfdksl </span>
                </el-form-item>
              </el-form>
            </template>
            <template v-else>
              <span style="white-space:pre-wrap;">{{ row.index }}</span>
            </template>
          </template>
        </el-table-column>
        <el-table-column label="课程目标" align="center">
          <template slot-scope="{row}">
            <template v-if="row.edit">
              <el-select v-model="row.target" placeholder="请选择课程目标">
                <el-option
                  v-for="item in targets"
                  :key="item.id"
                  :label="item.title + ': ' + item.desc"
                  :value="item.id"
                >
                  <span><strong>{{ item.title }}:</strong></span>
                  <span>{{ item.desc }}</span>
                </el-option>
              </el-select>
            </template>
            <template v-else>
              <span><strong>{{ row.target | titleFilter }}: </strong></span>
              <br>
              <span>{{ row.target | descFilter }}</span>
            </template>
          </template>
        </el-table-column>
        <el-table-column label="考核内容">
          <template slot-scope="{row}">
            <template v-if="row.edit">
              <el-input v-model="row.content" type="textarea" autosize size="small" />
            </template>
            <template v-else>
              <span style="white-space:pre-wrap;">{{ row.content }}</span>
            </template>
          </template>
        </el-table-column>
        <el-table-column label="评价依据及成绩比例" align="center">
          <el-table-column label="作业" width="80px" align="center">
            <template slot-scope="{row}">
              <template v-if="row.edit">
                <el-input v-model="row.works" type="number" size="small" />
              </template>
              <template v-else>
                <span>{{ row.works }}</span>
              </template>
            </template>
          </el-table-column>
          <el-table-column label="实验" width="80px" align="center">
            <template slot-scope="{row}">
              <template v-if="row.edit">
                <el-input v-model="row.experiment" type="number" size="small" />
              </template>
              <template v-else>
                <span>{{ row.experiment }}</span>
              </template>
            </template>
          </el-table-column>
          <el-table-column label="考试" width="80px" align="center">
            <template slot-scope="{row}">
              <template v-if="row.edit">
                <el-input v-model="row.exam" type="number" size="small" />
              </template>
              <template v-else>
                <span>{{ row.exam }}</span>
              </template>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="权重" width="120px" align="center">
          <template slot-scope="{row}">
            <template v-if="row.edit">
              <el-input v-model="row.weight" type="number" size="small" />
            </template>
            <template v-else>
              <span>{{ row.weight }}</span>
            </template>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column v-if="showOperation" label="操作" align="center">
        <template slot-scope="{row,$index}">
          <el-button
            type="primary"
            size="mini"
            plain
            icon="el-icon-edit"
            @click.native="showUpdateDialog(row)"
          > 保存 </el-button>
          <el-button
            type="danger"
            size="mini"
            plain
            icon="el-icon-delete"
            @click.native="deleteTable2(row, $index)"
          > 删除 </el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script src="./table_demo.js"></script>

<style>

.block {
  padding: 10px 0px;
}

.span_name {
  float: left;
  height: 32px;
  line-height: 32px;
  margin-right: 10px;
  margin-left: 10px;
  font-weight: 900;
}

.input_value {
  float: left;
  /* height: 32px; */
  width: 70%;
  margin-left: 10px;
}

.span_value {
  float: left;
  /* height: 32px; */
  line-height: 32px;
  margin-left: 10px;
  white-space: pre-wrap;
  text-align: left;
}

</style>
