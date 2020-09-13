<template>
  <div class="app-container">
    <div class="block">

      <el-row :gutter="20">
        <el-col :span="4">
          <el-input v-model="listQuery.account" size="mini" placeholder="请输入帐号" />
        </el-col>
        <el-col :span="4">
          <el-input v-model="listQuery.name" size="mini" placeholder="请输入姓名" />
        </el-col>
        <el-col :span="4">
          <dict-select
            v-model="listQuery.sex"
            dict-name="性别"
            placeholder="请选择性别"
          />
        </el-col>

        <el-col :span="4">
          <el-input v-model="listQuery.phone" size="mini" placeholder="请输入手机号" />
        </el-col>
        <el-col :span="4">
          <el-select v-model="listQuery.status" size="mini" placeholder="账号状态">
            <el-option
              v-for="item in statusList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>

        <el-col :span="4">
          <el-button
            type="success"
            size="mini"
            icon="el-icon-search"
            @click.native="search"
          >搜索</el-button>
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-refresh"
            @click.native="reset"
          >重置</el-button>
        </el-col>
      </el-row>
      <br>
      <el-row>
        <el-col :span="24">
          <el-button
            type="success"
            size="mini"
            icon="el-icon-plus"
            @click.native="add"
          >添加</el-button>
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-edit"
            @click.native="edit"
          >修改</el-button>
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click.native="remove"
          >删除</el-button>
          <el-button
            type="info"
            size="mini"
            icon="el-icon-s-operation"
            @click.native="openRole"
          >角色分配</el-button>
        </el-col>
      </el-row>
    </div>

    <el-row>
      <el-col :span="4">
        <el-tree
          empty-text="暂无数据"
          :expand-on-click-node="false"
          :default-expand-all="true"
          :data="accountCate"
          :props="defaultProps"
          class="input-tree"
          @node-click="handleNodeClick"
        />
      </el-col>
      <el-col :span="20">
        <el-table
          :key="tableKey"
          v-loading="listLoading"
          :data="list"
          border
          fit
          highlight-current-row
          style="width: 100%;"
        >
          <el-table-column label="账号">
            <template slot-scope="{row}">
              <span>{{ row.username }}</span>
            </template>
          </el-table-column>
          <el-table-column label="姓名">
            <template slot-scope="{row}">
              <span>{{ row.realname }}</span>
            </template>
          </el-table-column>
          <el-table-column label="角色">
            <template slot-scope="{row}">
              <span>{{ row.roles }}</span>
            </template>
          </el-table-column>
          <el-table-column label="联系方式">
            <template slot-scope="{row}">
              <span>{{ row.telephone }}</span>
            </template>
          </el-table-column>
          <el-table-column label="账号状态">
            <template slot-scope="{row}">
              <span>{{ row.status }}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建时间">
            <template slot-scope="{row}">
              <span>{{ row.create_time }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" min-width="150px">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="mini"
                icon="el-icon-edit"
                @click.native="editItem(scope.row)"
              > 修改 </el-button>
              <el-button
                type="text"
                size="mini"
                icon="el-icon-delete"
                @click.native="removeItem(scope.row)"
              > 删除 </el-button>
              <el-button
                type="text"
                size="mini"
                icon="el-icon-s-operation"
                @click.native="openRoleItem(scope.row)"
              >角色分配</el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
      </el-col>
    </el-row>

    <!-- <el-dialog title="角色分配" :visible.sync="roleDialog.visible" width="25%">
      <el-form>
        <el-row>
          <el-col :span="12">
            <el-tree
              ref="roleTree"
              :data="roleDialog.roles"
              show-checkbox
              node-key="id"
              :default-checked-keys="roleDialog.checkedRoleKeys"
              :props="roleDialog.defaultProps"
            />
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="primary" @click="setRole">{{ $t('button.submit') }}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog> -->

  </div>
</template>

<script src="./account.js"></script>

<style>

.block {
  padding: 10px 0px;
}

</style>
