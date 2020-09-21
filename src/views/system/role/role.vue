<template>
  <div class="app-container">
    <el-button v-permission="['add_role']" type="primary" @click="showCreateDialog">添加角色</el-button>

    <el-table :data="rolesList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="角色编码">
        <template slot-scope="scope">
          {{ scope.row.codename }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="角色名">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <!-- <template slot-scope="scope"> -->
        <template slot-scope="{row,$index}">
          <el-button v-permission="['update_role']" type="primary" size="small" plain icon="el-icon-edit" @click="showUpdateDialog(row)">编辑权限</el-button>
          <el-button v-permission="['delete_role']" type="danger" size="small" plain icon="el-icon-delete" @click="deleteData(row, $index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='update'?'编辑角色':'新增角色'">
      <el-form ref="form" :model="role" label-width="80px" :rules="rules" label-position="left">
        <el-form-item label="角色名" prop="name">
          <el-input v-model="role.name" placeholder="角色名" />
        </el-form-item>
        <el-form-item label="角色编码">
          <el-input v-model="role.codename" placeholder="角色编码(可使用角色名的英文单词)" />
        </el-form-item>
        <el-form-item label="权限">
          <el-tree
            ref="tree"
            :check-strictly="checkStrictly"
            :data="permissionTree"
            :props="defaultProps"
            show-checkbox
            node-key="id"
            class="permission-tree"
          />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="primary" @click="dialogType==='create'?createData():updateData()">确定</el-button>
        <el-button @click="dialogVisible=false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script src="./role.js"></script>

<style lang="scss" scoped>
.app-container {
  .roles-table {
    margin-top: 30px;
  }
  .permission-tree {
    margin-bottom: 30px;
  }
}
</style>
