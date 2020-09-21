<template>
  <div class="app-container">
    <div class="block">

      <el-row :gutter="15">
        <el-col :span="3">
          <el-input v-model="listQuery.username" size="small" placeholder="请输入帐号" />
        </el-col>
        <el-col :span="3">
          <el-input v-model="listQuery.realname" size="small" placeholder="请输入姓名" />
        </el-col>
        <el-col :span="3">
          <el-input v-model="listQuery.telephone" size="small" placeholder="请输入手机号" />
        </el-col>
        <el-col :span="3">
          <el-select v-model="listQuery.is_active" size="small" placeholder="账号状态">
            <el-option
              v-for="item in statusList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-select v-model="listQuery.roles" size="small" placeholder="角色">
            <el-option
              v-for="item in roleTree"
              :key="item.name"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-col>

        <el-col :span="4">
          <el-button
            type="success"
            size="small"
            icon="el-icon-search"
            @click.native="handleFilter"
          >搜索</el-button>
          <el-button
            type="primary"
            size="small"
            icon="el-icon-refresh"
            @click.native="resetFilter"
          >重置</el-button>
        </el-col>
      </el-row>
      <br>
      <el-row>
        <el-col :span="24">
          <el-button
            v-permission="['add_account',]"
            type="primary"
            size="small"
            icon="el-icon-plus"
            @click.native="showCreateDialog"
          >添加</el-button>
          <el-button
            type="primary"
            size="small"
            icon="el-icon-document"
            @click.native="downloadExcel"
          >导出Excel</el-button>
          <el-button
            type="primary"
            size="small"
            icon="el-icon-document"
          >导入Excel</el-button>
        </el-col>
      </el-row>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="账号" align="center">
        <template slot-scope="{row}">
          <span>{{ row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" align="center">
        <template slot-scope="{row}">
          <span>{{ row.realname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="角色" align="center">
        <template slot-scope="{row}">
          <span>{{ row.roles_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号" align="center">
        <template slot-scope="{row}">
          <span>{{ row.telephone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="账号状态" align="center">
        <template slot-scope="{row}">
          <el-tag :type="row.is_active | statusFilter">
            {{ row.is_active | typeFilter }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center">
        <template slot-scope="{row}">
          <span>{{ row.created_time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="170px" align="center">
        <template slot-scope="{row,$index}">
          <el-button
            v-permission="['update_account',]"
            type="primary"
            size="mini"
            plain
            icon="el-icon-edit"
            @click.native="showUpdateDialog(row)"
          > 修改 </el-button>
          <el-button
            v-permission="['delete_account',]"
            type="danger"
            size="mini"
            plain
            icon="el-icon-delete"
            @click.native="handleDelete(row, $index)"
          > 删除 </el-button>
          <el-button
            v-permission="['set_roles',]"
            type="info"
            size="mini"
            plain
            icon="el-icon-s-operation"
            @click.native="openRole(row)"
          >角色分配</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog
      :title="textMap[accountDialogStatus]"
      :visible.sync="dialogFormVisible"
      width="70%"
    >
      <el-form ref="form" status-icon :model="temp" :rules="rulesList" label-width="120px" label-position="right">
        <el-row>
          <el-col :span="12">
            <el-form-item label="账号" prop="username">
              <el-input v-show="accountDialogStatus=='create'" v-model="temp.username" />
              <el-input v-show="accountDialogStatus=='update'" v-model="temp.username" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="姓名" prop="realname">
              <el-input v-model="temp.realname" />
            </el-form-item>
          </el-col>
          <el-col v-show="accountDialogStatus=='create'" :span="12">
            <el-form-item label="密码" prop="password">
              <el-input v-model="temp.password" type="password" auto-complete="off" /></el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="temp.email" />
            </el-form-item>
          </el-col>
          <el-col v-show="accountDialogStatus=='create'" :span="12">
            <el-form-item label="确认密码" prop="checkPassword">
              <el-input v-model="temp.checkPassword" type="password" auto-complete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号码" prop="telephone">
              <el-input v-model="temp.telephone" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否启用" prop="is_active">
              <el-switch v-model="temp.is_active" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="accountDialogStatus==='create'?createData():updateData()">
          确定
        </el-button>
        <el-button @click.native="dialogFormVisible = false">
          取消
        </el-button>
      </div>
    </el-dialog>

    <el-dialog title="角色分配" :visible.sync="roleDialog.visible" width="25%">
      <el-form>
        <el-checkbox-group v-model="rolesCheckedList">
          <div v-for="role in roleTree" :key="role.name">
            <el-checkbox :key="role.name" :label="role.id" :value="role.id">
              {{ role.name }}
            </el-checkbox>
            <div style="margin: 15px 0;" />
          </div>
        </el-checkbox-group>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="setRole">
          确定
        </el-button>
        <el-button @click.native="roleDialog.visible = false">
          取消
        </el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script src="./account.js"></script>

<style>

.block {
  padding: 10px 0px;
}

</style>
