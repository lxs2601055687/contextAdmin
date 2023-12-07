<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="队名" prop="teamName">
        <el-input
          v-model="queryParams.teamName"
          placeholder="请输入队名"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="队长姓名" prop="teamLeaderName">
        <el-input
          v-model="queryParams.teamLeaderName"
          placeholder="请输入队长姓名"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="赛道" prop="track">
        <el-input
          v-model="queryParams.track"
          placeholder="请输入赛道"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="参加竞赛名称" prop="activityName">
        <el-input
          v-model="queryParams.activityName"
          placeholder="请输入参加竞赛名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="指导教师" prop="teacher">
        <el-input
          v-model="queryParams.teacher"
          placeholder="请输入指导教师"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="队员" prop="teamMemberName">
        <el-input
          v-model="queryParams.teamMemberName"
          placeholder="请输入队员"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="队员学号" prop="teamMemberId">
        <el-input
          v-model="queryParams.teamMemberId"
          placeholder="请输入队员学号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['contest:info:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['contest:info:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['contest:info:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['contest:info:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="infoList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="主键id" align="center" prop="id" v-if="true"/>
      <el-table-column label="队名" align="center" prop="teamName" />
      <el-table-column label="队长姓名" align="center" prop="teamLeaderName" />
      <el-table-column label="赛道" align="center" prop="track" />
      <el-table-column label="参加竞赛名称" align="center" prop="activityName" />
      <el-table-column label="指导教师" align="center" prop="teacher" />
      <el-table-column label="队员" align="center" prop="teamMemberName" />
      <el-table-column label="队员学号" align="center" prop="teamMemberId" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-zoom-in"
            @click="handleShow(scope.row)"
          >详情</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['contest:info:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['contest:info:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改团队管理对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="队名" prop="teamName">
          <el-input v-model="form.teamName" placeholder="请输入队名" />
        </el-form-item>
        <el-form-item label="队长姓名" prop="teamLeaderName">
          <el-input v-model="form.teamLeaderName" placeholder="请输入队长姓名" />
        </el-form-item>
        <el-form-item label="赛道" prop="track">
          <el-input v-model="form.track" placeholder="请输入赛道" />
        </el-form-item>
        <el-form-item label="参加竞赛名称" prop="activityName">
          <el-input v-model="form.activityName" placeholder="请输入参加竞赛名称" />
        </el-form-item>
        <el-form-item label="指导教师" prop="teacher">
          <el-input v-model="form.teacher" placeholder="请输入指导教师" />
        </el-form-item>
        <el-form-item label="队员" prop="teamMemberName">
          <el-input v-model="form.teamMemberName" placeholder="请输入队员" />
        </el-form-item>
        <el-form-item label="队员学号" prop="teamMemberId">
          <el-input v-model="form.teamMemberId" placeholder="请输入队员学号" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button :loading="buttonLoading" type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listInfo, getInfo, delInfo, addInfo, updateInfo } from "@/api/contest/info";
import {searchTeamMemberInfo} from "@/api/contest/user";

export default {
  name: "Info",
  data() {
    return {
      // 按钮loading
      buttonLoading: false,
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 团队管理表格数据
      infoList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        teamName: undefined,
        teamLeaderName: undefined,
        track: undefined,
        activityName: undefined,
        teacher: undefined,
        teamMemberName: undefined,
        teamMemberId: undefined,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        id: [
          { required: true, message: "主键id不能为空", trigger: "blur" }
        ],
        teamName: [
          { required: true, message: "队名不能为空", trigger: "blur" }
        ],
        teamLeaderName: [
          { required: true, message: "队长姓名不能为空", trigger: "blur" }
        ],
        activityName: [
          { required: true, message: "参加竞赛名称不能为空", trigger: "blur" }
        ],
        teamMemberName: [
          { required: true, message: "队员不能为空", trigger: "blur" }
        ],
        teamMemberId: [
          { required: true, message: "队员学号不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询团队管理列表 */
    getList() {
      this.loading = true;
      listInfo(this.queryParams).then(response => {
        this.infoList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: undefined,
        teamName: undefined,
        teamLeaderName: undefined,
        deleted: undefined,
        track: undefined,
        activityName: undefined,
        teacher: undefined,
        teacherMember: undefined,
        teamMemberName: undefined,
        teamMemberId: undefined,
        teamId: undefined,
        createBy: undefined,
        createTime: undefined,
        updateBy: undefined,
        updateTime: undefined
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加团队管理";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.loading = true;
      this.reset();
      const id = row.id || this.ids
      getInfo(id).then(response => {
        this.loading = false;
        this.form = response.data;
        this.open = true;
        this.title = "修改团队管理";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.buttonLoading = true;
          if (this.form.id != null) {
            updateInfo(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            }).finally(() => {
              this.buttonLoading = false;
            });
          } else {
            addInfo(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            }).finally(() => {
              this.buttonLoading = false;
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$modal.confirm('是否确认删除团队管理编号为"' + ids + '"的数据项？').then(() => {
        this.loading = true;
        return delInfo(ids);
      }).then(() => {
        this.loading = false;
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {
      }).finally(() => {
        this.loading = false;
      });
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('contest/info/export', {
        ...this.queryParams
      }, `info_${new Date().getTime()}.xlsx`)
    },
    handleShow(row) {
      const uid = row.teamMemberId || this.teamMemberId;
      searchTeamMemberInfo(uid).then((res) => {
        const info = '学号：' + res.data.uid + ' 姓名：' + res.data.name + ' 学院：' + res.data.academy + ' 专业：' + res.data.specializedSubject + ' 电话：' +res.data.phone;
        this.$alert(info, '队员详细信息', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `无异常`
            });
          }
        });
      })
    }
  }
};
</script>
