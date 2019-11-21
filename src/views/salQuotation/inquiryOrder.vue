<template>
  <div id="inquiryGrab">
    <div class="contentBox">
      <div class="searchBox">
        <div class="searchCondition">搜索条件：</div>
        <el-form class="condition" :model="ruleForm" ref="ruleForm" size="small" :inline="true">
          <el-form-item label="" prop="quotationNo">
            <!-- <el-input placeholder="请输入报价单号" v-model="ruleForm.quotationNo" suffix-icon="el-icon-search" size="small"></el-input> -->
              <el-select v-model="ruleForm.quotationNo" filterable placeholder="请输入报价单号" size="small">
                <el-option v-for="items in tableDataOne.rows" :key="items.id" :label="items.quotationNo" :value="items.quotationNo" ></el-option>
              </el-select>
              <!-- <i class="el-icon-search"></i> -->
              <img class="searchIcoClass" src="../../assets/image/search.png" title="搜索" @click="searchTypeQuotation('quotationNo')" />
          </el-form-item>
          <el-form-item label="" prop="customerNo">
            <!-- <el-input placeholder="请输入联系人编号" v-model="ruleForm.customerNo" suffix-icon="el-icon-search" size="small"></el-input> -->
            <el-select v-model="ruleForm.customerNo" filterable placeholder="请输入联系人编号" size="small">
              <el-option v-for="items in CustomerList" :key="items.id" :label="items.contactCode" :value="items.contactCode" ></el-option>
            </el-select>
            <!-- <i class="el-icon-search"></i> -->
            <img class="searchIcoClass" src="../../assets/image/search.png" title="搜索" @click="searchTypeQuotation('contactCode')" />
          </el-form-item>
          <div style="display: inline-block;">
            <el-form-item label="" prop="chooses" style="margin: 0;">
              <el-select v-model="ruleForm.chooses" placeholder="请选择" size="small">
                <el-option v-for="item in dateOptions" :key="item.id" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="start" style="margin: 0;">
              <el-date-picker v-model="ruleForm.start" type="date" :picker-options="startDatePicker" ref="searchStart" placeholder="起始日期" size="small"></el-date-picker>
            </el-form-item>
            <el-form-item style="margin: 0 5px;">-</el-form-item>
            <el-form-item prop="end" style="margin: 0;">
              <el-date-picker v-model="ruleForm.end" type="date" :picker-options="endDatePicker" ref="searchEnd" placeholder="结束日期" size="small"></el-date-picker>
            </el-form-item>
          </div>
          <el-form-item style="display:none;" label="状态查询" prop="statusSearch">
            <el-select v-model="ruleForm.statusSearch" placeholder="请选择" size="small">
              <el-option v-for="item in statusOptions" :key="item.id" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
              <span style="margin-right: 20px;" v-for="item in searchList" :key="item.id">
                <el-button v-if="item.operationCode==='search'" :id="item.operationCode" :title="item.operationName" type="primary" size="small" icon="" @click="barSearchOperation">{{item.operationName}}</el-button>
                <el-button v-if="item.operationCode==='empty'" :id="item.operationCode" :title="item.operationName" type="primary" size="small" icon="" @click="barEmptyOperation" >{{item.operationName}}</el-button>
              </span>
          </el-form-item>
        </el-form>
      </div>
      <el-table ref="tableCus" @cell-click="clickTable" :row-style="{height:'50px'}" :cell-style="{padding:'0px'}" stripe size="mini" height="650px" :max-height="clientHeight" :data="tableDataOne.rows" @expand-change="expandSelect" border v-loading="loading" element-loading-text="拼命加载中" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <!--3D打印-->
                <el-table
                  class="tableStyleQuotation"
                  v-show="twoTableShow3d"
                  show-summary
                  :summary-method="getTotal3D"
                  border
                  v-loading="loading"
                  :data="tableDataTwo3d"
                  @selection-change="selsChange"
                  style="width: 100%">
                  <template v-for="item in tHeadDataTwo3d">
                    <el-table-column
                      v-if="item.columnName==='imagenamePath'"
                      :width="item.columnWidth"
                      :key="item.id"
                      :label="item.columnCname"
                      align="center"
                    >
                      <template slot-scope="scope">
                        <div
                          :title="scope.row.attachmentOriginal3dname"
                          class="attachmentName"
                        >{{scope.row.attachmentOriginal3dname}}</div>
                        <div>
                          <span v-if="scope.row.technologyCategory=='4'">复模</span>
                          <span v-else-if="scope.row.technologyCategory=='3'">3D打印</span>
                          <span v-else-if="scope.row.technologyCategory=='10'">快速模具</span>
                          <span v-else-if="scope.row.technologyCategory=='1'">CNC塑料</span>
                          <span v-else>CNC金属</span>
                        </div>
                        <div>
                          <img
                            :title="scope.row.attachmentOriginal3dname"
                            style="width:70%;"
                            :src="scope.row.imagenamePath"
                            alt
                          />
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      v-else-if="item.columnName==='technologyCname'"
                      :width="item.columnWidth"
                      :key="item.id"
                      :label="item.columnCname"
                      align="center"
                    >
                      <template slot-scope="scope">
                        <span>
                          <div class="trimmedSize">
                            <span class="spanTitle">尺寸：</span>
                            <span>{{ scope.row.dimensionX}}*{{ scope.row.dimensionY}}*{{ scope.row.dimensionZ}}mm</span>
                          </div>
                          <div class="trimmedSize">
                            <span class="spanTitle">重量：</span>
                            <span>{{ scope.row.weightsGm}}g</span>
                          </div>
                          <span v-if="scope.row.checkedColumn">
                            <div v-show="item.boolEdit=='1'" class="trimmedSize">
                              <span>加工方式：</span>
                              <span>
                                <el-select
                                  v-model="scope.row.technologyCname"
                                  filterable
                                  :title="scope.row.technologyCname"
                                  placeholder="请选择"
                                  class="el-select-quote"
                                  size="small">
                                  <el-option
                                    v-for="items in technologyList"
                                    :key="items.id"
                                    @click.native="checkTechnology(items)"
                                    :label="items.techName"
                                    :value="items.techName"
                                  ></el-option>
                                </el-select>
                              </span>
                            </div>
                            <div v-show="item.boolEdit=='1'" class="trimmedSize">
                              <span class="divSpan">材料：</span>
                              <span>
                                <el-select
                                  v-model="scope.row.partMaterialCname"
                                  filterable
                                  :title="scope.row.partMaterialCname"
                                  placeholder="请选择"
                                  class="el-select-quote"
                                  size="small">
                                  <el-option
                                    v-for="items in materialList"
                                    :key="items.id"
                                    @click.native="checkMaterial(items)"
                                    :label="items.materialCname"
                                    :value="items.materialCname"
                                  ></el-option>
                                </el-select>
                              </span>
                            </div>

                            <div v-show="item.boolEdit!='1'" class="trimmedSize">
                              <span>加工方式：</span>
                              <span>{{ scope.row.technologyCname}}</span>
                            </div>
                            <div v-show="item.boolEdit!='1'" class="trimmedSize">
                              <span class="divSpan">材料：</span>
                              <span>{{ scope.row.partMaterialCname}}</span>
                            </div>
                          </span>
                          <span v-else>
                            <div class="trimmedSize">
                              <span>加工方式：</span>
                              <span>{{ scope.row.technologyCname}}</span>
                            </div>
                            <div class="trimmedSize">
                              <span class="divSpan">材料：</span>
                              <span>{{ scope.row.partMaterialCname}}</span>
                            </div>
                          </span>
                        </span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      v-else-if="item.columnName==='partMaterialCode'"
                      :width="item.columnWidth"
                      :key="item.id"
                      :label="item.columnCname"
                      align="center"
                    >
                      <template slot-scope="scope">
                        <span>
                          <div class="trimmedSize">
                            <span>后处理：</span>
                            <span v-if="scope.row.checkedColumn">
                              <el-input
                                v-show="item.boolEdit=='1'"
                                class="el-input-quote"
                                v-model="scope.row.finishqualityName"
                              ></el-input>
                              <span v-show="item.boolEdit!='1'">{{ scope.row.finishqualityName}}</span>
                            </span>
                            <span v-else>{{ scope.row.finishqualityName}}</span>
                          </div>
                        </span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      v-else-if="item.columnName==='masterMaterialCode'"
                      :width="item.columnWidth"
                      :key="item.id"
                      :label="item.columnCname"
                      align="center"
                    >
                      <template slot-scope="scope">
                        <span v-if="scope.row.checkedColumn">
                          <div class="trimmedSize">
                            <span>生产周期：</span>
                            <el-input v-show="item.boolEdit=='1'" class="el-input-quote" v-model="scope.row.totalLeadtime">天</el-input>
                            <span v-show="item.boolEdit!='1'">{{ scope.row.totalLeadtime}}天</span>
                          </div>
                          <div class="trimmedSize">
                            <span>单件工时：</span>
                            <el-input v-show="item.boolEdit=='1'" class="el-input-quote" v-model="scope.row.cnc3dSinglehours">H</el-input>
                            <span v-show="item.boolEdit!='1'">{{ scope.row.cnc3dSinglehours}}H</span>
                          </div>
                          <div class="trimmedSize">
                            <span>手工工时：</span>
                            <el-input v-show="item.boolEdit=='1'" class="el-input-quote" v-model="scope.row.handSinglehours">H</el-input>
                            <span v-show="item.boolEdit!='1'">{{ scope.row.handSinglehours}}H</span>
                          </div>
                        </span>
                        <span v-else>
                          <div class="trimmedSize">
                            <span>生产周期：</span>
                            <span>{{ scope.row.totalLeadtime}}天</span>
                          </div>
                          <div class="trimmedSize">
                            <span>单件工时：</span>
                            <span>{{ scope.row.cnc3dSinglehours}}H</span>
                          </div>
                          <div class="trimmedSize">
                            <span>手工工时：</span>
                            <span>{{ scope.row.handSinglehours}}H</span>
                          </div>
                        </span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      v-else-if="item.columnName==='remarks'"
                      :width="item.columnWidth"
                      :key="item.id"
                      :prop="item.columnName"
                      :label="item.columnCname"
                      align="center"
                    >
                      <template slot-scope="scope">
                        <span v-if="scope.row.checkedColumn">
                          <textarea
                            v-show="item.boolEdit=='1'"
                            name
                            cols="10"
                            rows="5"
                            v-model="scope.row[item.columnName]"
                          ></textarea>
                          <span v-show="item.boolEdit!='1'">{{scope.row[item.columnName]}}</span>
                        </span>
                        <span v-else>{{scope.row[item.columnName]}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      v-else
                      :width="item.columnWidth"
                      :key="item.id"
                      :prop="item.columnName"
                      :label="item.columnCname"
                      align="center"
                    >
                      <template slot-scope="scope">
                        <span v-if="scope.row.checkedColumn">
                          <el-input v-show="item.boolEdit=='1'" class="el-input-quote" v-model="scope.row[item.columnName]"></el-input>
                          <span v-show="item.boolEdit!='1'">{{scope.row[item.columnName]}}</span>
                        </span>
                        <span v-else>{{scope.row[item.columnName]}}</span>
                      </template>
                    </el-table-column>
                  </template>
                </el-table>
                <!--CNC金属-->
                <el-table
                  class="tableStyleQuotation"
                  v-show="twoTableShowCncm"
                  show-summary
                  :summary-method="getTotalCncm"
                  border
                  v-loading="loading"
                  :data="tableDataTwoCncm"
                  @selection-change="selsChange"
                  style="width: 100%">
                  <template v-for="item in tHeadDataTwoCncm">
                    <el-table-column
                      v-if="item.columnName==='imagenamePath'"
                      :width="item.columnWidth"
                      :key="item.id"
                      :label="item.columnCname"
                      align="center"
                    >
                      <template slot-scope="scope">
                        <div
                          :title="scope.row.attachmentOriginal3dname"
                          class="attachmentName"
                        >{{scope.row.attachmentOriginal3dname}}</div>
                        <div>
                          <span>CNC金属</span>
                        </div>
                        <div>
                          <img
                            :title="scope.row.attachmentOriginal3dname"
                            style="width:70%;"
                            :src="scope.row.imagenamePath"
                            alt
                          />
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      v-else-if="item.columnName==='technologyCname'"
                      :width="item.columnWidth"
                      :key="item.id"
                      :label="item.columnCname"
                      align="center"
                    >
                      <template slot-scope="scope">
                        <span>
                          <div class="trimmedSize">
                            <span class="spanTitle">尺寸：</span>
                            <span>{{ scope.row.dimensionX}}*{{ scope.row.dimensionY}}*{{ scope.row.dimensionZ}}mm</span>
                          </div>
                          <div class="trimmedSize">
                            <span class="spanTitle">体积：</span>
                            <span>{{ scope.row.volume}}mm³</span>
                          </div>
                          <span v-if="scope.row.checkedColumn">
                            <div v-show="item.boolEdit=='1'" class="trimmedSize">
                              <span>加工方式：</span>
                              <span>
                                <el-select
                                  v-model="scope.row.technologyCname"
                                  filterable
                                  :title="scope.row.technologyCname"
                                  placeholder="请选择"
                                  class="el-select-quote"
                                  size="small">
                                  <el-option
                                    v-for="items in technologyList"
                                    :key="items.id"
                                    @click.native="checkTechnology(items)"
                                    :label="items.techName"
                                    :value="items.techName"
                                  ></el-option>
                                </el-select>
                              </span>
                            </div>
                            <div v-show="item.boolEdit=='1'" class="trimmedSize">
                              <span class="divSpan">材料：</span>
                              <span>
                                <el-select
                                  v-model="scope.row.partMaterialCname"
                                  filterable
                                  :title="scope.row.partMaterialCname"
                                  class="el-select-quote"
                                  placeholder="请选择"
                                  size="small"
                                >
                                  <el-option
                                    v-for="items in materialList"
                                    :key="items.id"
                                    @click.native="checkMaterial(items)"
                                    :label="items.materialCname"
                                    :value="items.materialCname"
                                  ></el-option>
                                </el-select>
                              </span>
                            </div>

                            <div v-show="item.boolEdit!='1'" class="trimmedSize">
                              <span>加工方式：</span>
                              <span>{{ scope.row.technologyCname}}</span>
                            </div>
                            <div v-show="item.boolEdit!='1'" class="trimmedSize">
                              <span class="divSpan">材料：</span>
                              <span>{{ scope.row.partMaterialCname}}</span>
                            </div>
                          </span>
                          <span v-else>
                            <div class="trimmedSize">
                              <span>加工方式：</span>
                              <span>{{ scope.row.technologyCname}}</span>
                            </div>
                            <div class="trimmedSize">
                              <span class="divSpan">材料：</span>
                              <span>{{ scope.row.partMaterialCname}}</span>
                            </div>
                          </span>
                        </span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      v-else-if="item.columnName==='setParam'"
                      :width="item.columnWidth"
                      :key="item.id"
                      :label="item.columnCname"
                      align="center"
                    >
                      <template slot-scope="scope">
                        <span v-if="scope.row.checkedColumn">
                          <div class="trimmedSize">
                            <span class="divSpan">拆件：</span>
                            <span>
                              <el-select
                                v-show="item.boolEdit=='1'"
                                v-model="scope.row.splitCount"
                                filterable
                                :title="scope.row.splitCount"
                                placeholder="请选择"
                                class="el-select-quote"
                                size="small">
                                <el-option
                                  v-for="items in splitCountList"
                                  :key="items.id"
                                  :label="items.paramContent1"
                                  :value="items.paramContent1"
                                ></el-option>
                              </el-select>
                            </span>
                            <!-- <el-input v-show="item.boolEdit=='1'" v-model="scope.row.splitCount"></el-input> -->
                            <span v-show="item.boolEdit!='1'">{{ scope.row.splitCount}}</span>
                          </div>
                          <div class="trimmedSize">
                            <span>加工面数：</span>
                            <!-- <el-input v-show="item.boolEdit=='1'" v-model="scope.row.setupsCount"></el-input> -->
                            <span>
                              <el-select
                                v-show="item.boolEdit=='1'"
                                v-model="scope.row.setupsCount"
                                filterable
                                :title="scope.row.setupsCount"
                                placeholder="请选择"
                                class="el-select-quote"
                                size="small">
                                <el-option
                                  v-for="items in faceCountList"
                                  :key="items.id"
                                  :label="items.paramContent1"
                                  :value="items.paramContent1"
                                ></el-option>
                              </el-select>
                            </span>
                            <span v-show="item.boolEdit!='1'">{{ scope.row.setupsCount}}</span>
                          </div>
                          <div class="trimmedSize">
                            <span>难度系数：</span>
                            <!-- <el-input v-show="item.boolEdit=='1'" v-model="scope.row.complexityName"></el-input> -->
                            <span>
                              <el-select
                                v-show="item.boolEdit=='1'"
                                v-model="scope.row.complexityName"
                                filterable
                                :title="scope.row.complexityName"
                                placeholder="请选择"
                                class="el-select-quote"
                                size="small">
                                <el-option
                                  v-for="items in ComplexityFunList"
                                  :key="items.id"
                                  :label="items.complexityCname"
                                  :value="items.complexityCname"
                                ></el-option>
                              </el-select>
                            </span>
                            <span v-show="item.boolEdit!='1'">{{ scope.row.complexityName}}</span>
                          </div>
                          <div class="trimmedSize">
                            <span  class="divSpan">攻牙：</span>
                            <el-input v-show="item.boolEdit=='1'" class="el-input-quote" v-model="scope.row.threadQty"></el-input>
                            <span v-show="item.boolEdit!='1'">{{ scope.row.threadQty}}</span>
                          </div>
                          <div class="trimmedSize">
                            <span class="divSpan">公差：</span>
                            <!-- <el-input v-show="item.boolEdit=='1'" v-model="scope.row.tolerance"></el-input> -->
                            <span>
                              <el-select
                                v-show="item.boolEdit=='1'"
                                v-model="scope.row.tolerance"
                                filterable
                                :title="scope.row.tolerance"
                                placeholder="请选择"
                                class="el-select-quote"
                                size="small">
                                <el-option
                                  v-for="items in toleranceList"
                                  :key="items.id"
                                  :label="items.paramContent1"
                                  :value="items.paramContent1"
                                ></el-option>
                              </el-select>
                            </span>
                            <span v-show="item.boolEdit!='1'">{{ scope.row.tolerance}}</span>
                          </div>
                        </span>
                        <span v-else>
                          <div class="trimmedSize">
                            <span class="divSpan">拆件：</span>
                            <span>{{ scope.row.splitCount}}</span>
                          </div>
                          <div class="trimmedSize">
                            <span>加工面数：</span>
                            <span>{{ scope.row.setupsCount}}</span>
                          </div>
                          <div class="trimmedSize">
                            <span>难度系数：</span>
                            <span>{{ scope.row.complexityName}}</span>
                          </div>
                          <div class="trimmedSize">
                            <span class="divSpan">攻牙：</span>
                            <span>{{ scope.row.threadQty}}</span>
                          </div>
                          <div class="trimmedSize">
                            <span class="divSpan">公差：</span>
                            <span>{{ scope.row.tolerance}}</span>
                          </div>
                        </span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      v-else-if="item.columnName==='partMaterialCode'"
                      :width="item.columnWidth"
                      :key="item.id"
                      :label="item.columnCname"
                      align="center"
                    >
                      <template slot-scope="scope">
                        <span v-if="scope.row.checkedColumn">
                          <div class="trimmedSize">
                            <span>线切割：</span>
                            <span>
                              <input
                                v-show="item.boolEdit=='1'"
                                type="checkbox"
                                v-model="scope.row.checkedWireCutting"
                                @change="getcncmWire(scope.row)"
                              />
                            </span>
                            <span>
                              <input
                                v-show="item.boolEdit!='1'"
                                disabled="disabled"
                                type="checkbox"
                                v-model="scope.row.checkedWireCutting"
                              />
                            </span>
                            <span>打火花：</span>
                            <span>
                              <input
                                v-show="item.boolEdit=='1'"
                                type="checkbox"
                                v-model="scope.row.checkedEdm"
                                @change="getcncmEdm(scope.row)"
                              />
                            </span>
                            <span>
                              <input
                                v-show="item.boolEdit!='1'"
                                disabled="disabled"
                                type="checkbox"
                                v-model="scope.row.checkedEdm"
                              />
                            </span>
                          </div>
                          <div class="trimmedSize">
                            <span style="letter-spacing: 4px">镶件：</span>
                            <el-input v-show="item.boolEdit=='1'" class="el-input-quote" v-model="scope.row.cncInsertQty"></el-input>
                            <span v-show="item.boolEdit!='1'">{{ scope.row.cncInsertQty}}</span>
                          </div>
                          <div class="trimmedSize">
                            <span>后处理：</span>
                            <el-input v-show="item.boolEdit=='1'" class="el-input-quote" v-model="scope.row.finishqualityName"></el-input>
                            <span v-show="item.boolEdit!='1'">{{ scope.row.finishqualityName}}</span>
                          </div>
                        </span>
                        <span v-else>
                          <div class="trimmedSize">
                            <span>线切割：</span>
                            <!-- item.checkedWireCutting testC{{item}} -->
                            <span>
                              <input type="checkbox" disabled v-model="scope.row.checkedWireCutting" />
                            </span>
                            <span>打火花：</span>
                            <span>
                              <input type="checkbox" disabled v-model="scope.row.checkedEdm" />
                            </span>
                          </div>
                          <div class="trimmedSize">
                            <span style="letter-spacing: 4px">镶件：</span>
                            <span>{{ scope.row.cncInsertQty}}</span>
                          </div>
                          <div class="trimmedSize">
                            <span>后处理：</span>
                            <span>{{ scope.row.finishqualityName}}</span>
                          </div>
                        </span>
                      </template>
                    </el-table-column>

                    <el-table-column
                      v-else-if="item.columnName==='masterMaterialCode'"
                      :width="item.columnWidth"
                      :key="item.id"
                      :label="item.columnCname"
                      align="center"
                    >
                      <template slot-scope="scope">
                        <span v-if="scope.row.checkedColumn">
                          <div class="trimmedSize">
                            <span>生产周期：</span>
                            <el-input v-show="item.boolEdit=='1'" class="el-input-quote" v-model="scope.row.totalLeadtime">天</el-input>
                            <span v-show="item.boolEdit!='1'">{{ scope.row.totalLeadtime}}天</span>
                          </div>
                          <div class="trimmedSize">
                            <span>单件工时：</span>
                            <el-input v-show="item.boolEdit=='1'" class="el-input-quote" v-model="scope.row.cnc3dSinglehours">H</el-input>
                            <span v-show="item.boolEdit!='1'">{{ scope.row.cnc3dSinglehours}}H</span>
                          </div>
                          <div class="trimmedSize">
                            <span>手工工时：</span>
                            <el-input v-show="item.boolEdit=='1'" class="el-input-quote" v-model="scope.row.handSinglehours">H</el-input>
                            <span v-show="item.boolEdit!='1'">{{ scope.row.handSinglehours}}H</span>
                          </div>
                        </span>
                        <span v-else>
                          <div class="trimmedSize">
                            <span>生产周期：</span>
                            <span>{{ scope.row.totalLeadtime}}天</span>
                          </div>
                          <div class="trimmedSize">
                            <span>单件工时：</span>
                            <span>{{ scope.row.cnc3dSinglehours}}H</span>
                          </div>
                          <div class="trimmedSize">
                            <span>手工工时：</span>
                            <span>{{ scope.row.handSinglehours}}H</span>
                          </div>
                        </span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      v-else-if="item.columnName==='remarks'"
                      :width="item.columnWidth"
                      :key="item.id"
                      :prop="item.columnName"
                      :label="item.columnCname"
                      align="center"
                    >
                      <template slot-scope="scope">
                        <span v-if="scope.row.checkedColumn">
                          <textarea
                            v-show="item.boolEdit=='1'"
                            name
                            cols="10"
                            rows="5"
                            v-model="scope.row[item.columnName]"
                          ></textarea>
                          <span v-show="item.boolEdit!='1'">{{scope.row[item.columnName]}}</span>
                        </span>
                        <span v-else>{{scope.row[item.columnName]}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      v-else
                      :width="item.columnWidth"
                      :key="item.id"
                      :prop="item.columnName"
                      :label="item.columnCname"
                      align="center"
                    >
                      <template slot-scope="scope">
                        <span v-if="scope.row.checkedColumn">
                          <el-input v-show="item.boolEdit=='1'" class="el-input-quote" v-model="scope.row[item.columnName]"></el-input>
                          <span v-show="item.boolEdit!='1'">{{scope.row[item.columnName]}}</span>
                        </span>
                        <span v-else>{{scope.row[item.columnName]}}</span>
                      </template>
                    </el-table-column>
                  </template>
                </el-table>
                <!--CNC塑料-->
                <el-table
                  class="tableStyleQuotation"
                  v-show="twoTableShowCncp"
                  show-summary
                  :summary-method="getTotalCncp"
                  border
                  v-loading="loading"
                  :data="tableDataTwoCncp"
                  @selection-change="selsChange"
                  style="width: 100%">
                  <template v-for="item in tHeadDataTwoCncp">
                    <el-table-column
                      v-if="item.columnName==='imagenamePath'"
                      :width="item.columnWidth"
                      :key="item.columnName"
                      :label="item.columnCname"
                      align="center"
                    >
                      <template slot-scope="scope">
                        <div
                          :title="scope.row.attachmentOriginal3dname"
                          class="attachmentName"
                        >{{scope.row.attachmentOriginal3dname}}</div>
                        <div>
                          <span>CNC塑料</span>
                        </div>
                        <div>
                          <img
                            :title="scope.row.attachmentOriginal3dname"
                            style="width:70%;"
                            :src="scope.row.imagenamePath"
                            alt
                          />
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      v-else-if="item.columnName==='technologyCname'"
                      :width="item.columnWidth"
                      :key="item.columnName"
                      :label="item.columnCname"
                      align="center"
                    >
                      <template slot-scope="scope">
                        <span>
                          <div class="trimmedSize">
                            <span class="spanTitle">尺寸：</span>
                            <span>{{ scope.row.dimensionX}}*{{ scope.row.dimensionY}}*{{ scope.row.dimensionZ}}mm</span>
                          </div>
                          <div class="trimmedSize">
                            <span class="spanTitle">体积：</span>
                            <span>{{ scope.row.volume}}mm³</span>
                          </div>
                          <span v-if="scope.row.checkedColumn">
                            <div v-show="item.boolEdit=='1'" class="trimmedSize">
                              <span>加工方式：</span>
                              <span>
                                <el-select
                                  v-model="scope.row.technologyCname"
                                  filterable
                                  :title="scope.row.technologyCname"
                                  placeholder="请选择"
                                  class="el-select-quote"
                                  size="small">
                                  <el-option
                                    v-for="items in technologyList"
                                    :key="items.id"
                                    @click.native="checkTechnology(items)"
                                    :label="items.techName"
                                    :value="items.techName"
                                  ></el-option>
                                </el-select>
                              </span>
                            </div>
                            <div v-show="item.boolEdit=='1'" class="trimmedSize">
                              <span class="divSpan">材料：</span>
                              <span>
                                <el-select
                                  v-model="scope.row.partMaterialCname"
                                  filterable
                                  :title="scope.row.partMaterialCname"
                                  placeholder="请选择"
                                  class="el-select-quote"
                                  size="small"
                                >
                                  <el-option
                                    v-for="items in materialList"
                                    :key="items.id"
                                    @click.native="checkMaterial(items)"
                                    :label="items.materialCname"
                                    :value="items.materialCname"
                                  ></el-option>
                                </el-select>
                              </span>
                            </div>

                            <div v-show="item.boolEdit!='1'" class="trimmedSize">
                              <span>加工方式：</span>
                              <span>{{ scope.row.technologyCname}}</span>
                            </div>
                            <div v-show="item.boolEdit!='1'" class="trimmedSize">
                              <span class="divSpan">材料：</span>
                              <span>{{ scope.row.partMaterialCname}}</span>
                            </div>
                          </span>
                          <span v-else>
                            <div class="trimmedSize">
                              <span>加工方式：</span>
                              <span>{{ scope.row.technologyCname}}</span>
                            </div>
                            <div class="trimmedSize">
                              <span class="divSpan">材料：</span>
                              <span>{{ scope.row.partMaterialCname}}</span>
                            </div>
                          </span>
                        </span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      v-else-if="item.columnName==='setParam'"
                      :width="item.columnWidth"
                      :key="item.columnName"
                      :label="item.columnCname"
                      align="center"
                    >
                      <template slot-scope="scope">
                        <span v-if="scope.row.checkedColumn">
                          <div class="trimmedSize">
                            <span class="divSpan">拆件：</span>
                            <span>
                              <el-select
                                v-show="item.boolEdit=='1'"
                                v-model="scope.row.splitCount"
                                filterable
                                :title="scope.row.splitCount"
                                class="el-select-quote"
                                placeholder="请选择"
                                size="small"
                              >
                                <el-option
                                  v-for="items in splitCountList"
                                  :key="items.id"
                                  :label="items.paramContent1"
                                  :value="items.paramContent1"
                                ></el-option>
                              </el-select>
                            </span>
                            <!-- <el-input v-show="item.boolEdit=='1'" v-model="scope.row.splitCount"></el-input> -->
                            <span v-show="item.boolEdit!='1'">{{ scope.row.splitCount}}</span>
                          </div>
                          <div class="trimmedSize">
                            <span>加工面数：</span>
                            <!-- <el-input v-show="item.boolEdit=='1'" v-model="scope.row.setupsCount"></el-input> -->
                            <span>
                              <el-select
                                v-show="item.boolEdit=='1'"
                                v-model="scope.row.setupsCount"
                                filterable
                                :title="scope.row.setupsCount"
                                class="el-select-quote"
                                placeholder="请选择"
                                size="small"
                              >
                                <el-option
                                  v-for="items in faceCountList"
                                  :key="items.id"
                                  :label="items.paramContent1"
                                  :value="items.paramContent1"
                                ></el-option>
                              </el-select>
                            </span>
                            <span v-show="item.boolEdit!='1'">{{ scope.row.setupsCount}}</span>
                          </div>
                          <div class="trimmedSize">
                            <span>难度系数：</span>
                            <!-- <el-input v-show="item.boolEdit=='1'" v-model="scope.row.complexityName"></el-input> -->
                            <span>
                              <el-select
                                v-show="item.boolEdit=='1'"
                                v-model="scope.row.complexityName"
                                filterable
                                :title="scope.row.complexityName"
                                class="el-select-quote"
                                placeholder="请选择"
                                size="small"
                              >
                                <el-option
                                  v-for="items in ComplexityFunList"
                                  :key="items.id"
                                  :label="items.complexityCname"
                                  :value="items.complexityCname"
                                ></el-option>
                              </el-select>
                            </span>
                            <span v-show="item.boolEdit!='1'">{{ scope.row.complexityName}}</span>
                          </div>
                          <div class="trimmedSize">
                            <span class="divSpan">攻牙：</span>
                            <el-input v-show="item.boolEdit=='1'" class="el-input-quote" v-model="scope.row.threadQty"></el-input>
                            <span v-show="item.boolEdit!='1'">{{ scope.row.threadQty}}</span>
                          </div>
                          <div class="trimmedSize">
                            <span class="divSpan">公差：</span>
                            <span>
                              <el-select
                                v-show="item.boolEdit=='1'"
                                v-model="scope.row.tolerance"
                                filterable
                                :title="scope.row.tolerance"
                                class="el-select-quote"
                                placeholder="请选择"
                                size="small"
                              >
                                <el-option
                                  v-for="items in toleranceList"
                                  :key="items.id"
                                  :label="items.paramContent1"
                                  :value="items.paramContent1"
                                ></el-option>
                              </el-select>
                            </span>
                            <span v-show="item.boolEdit!='1'">{{ scope.row.tolerance}}</span>
                          </div>
                        </span>
                        <span v-else>
                          <div class="trimmedSize">
                            <span class="divSpan">拆件：</span>
                            <span>{{ scope.row.splitCount}}</span>
                          </div>
                          <div class="trimmedSize">
                            <span>加工面数：</span>
                            <span>{{ scope.row.setupsCount}}</span>
                          </div>
                          <div class="trimmedSize">
                            <span>难度系数：</span>
                            <span>{{ scope.row.complexityName}}</span>
                          </div>
                          <div class="trimmedSize">
                            <span class="divSpan">攻牙：</span>
                            <span>{{ scope.row.threadQty}}</span>
                          </div>
                          <div class="trimmedSize">
                            <span class="divSpan">公差：</span>
                            <span>{{ scope.row.tolerance}}</span>
                          </div>
                        </span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      v-else-if="item.columnName==='partMaterialCode'"
                      :width="item.columnWidth"
                      :key="item.columnName"
                      :label="item.columnCname"
                      align="center"
                    >
                      <template slot-scope="scope">
                        <span v-if="scope.row.checkedColumn">
                          <div class="trimmedSize">
                            <span style="letter-spacing: 4px">镶件：</span>
                            <el-input v-show="item.boolEdit=='1'" class="el-input-quote" v-model="scope.row.cncInsertQty"></el-input>
                            <span v-show="item.boolEdit!='1'">{{ scope.row.cncInsertQty}}</span>
                          </div>
                          <div class="trimmedSize">
                            <span>后处理：</span>
                            <el-input v-show="item.boolEdit=='1'" class="el-input-quote" v-model="scope.row.finishqualityName"></el-input>
                            <span v-show="item.boolEdit!='1'">{{ scope.row.finishqualityName}}</span>
                          </div>
                        </span>
                        <span v-else>
                          <div class="trimmedSize">
                            <span style="letter-spacing: 4px">镶件：</span>
                            <span>{{ scope.row.cncInsertQty}}</span>
                          </div>
                          <div class="trimmedSize">
                            <span>后处理：</span>
                            <span>{{ scope.row.finishqualityName}}</span>
                          </div>
                        </span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      v-else-if="item.columnName==='masterMaterialCode'"
                      :width="item.columnWidth"
                      :key="item.columnName"
                      :label="item.columnCname"
                      align="center"
                    >
                      <template slot-scope="scope">
                        <span v-if="scope.row.checkedColumn">
                          <div class="trimmedSize">
                            <span>生产周期：</span>
                            <el-input v-show="item.boolEdit=='1'" class="el-input-quote" v-model="scope.row.totalLeadtime">天</el-input>
                            <span v-show="item.boolEdit!='1'">{{ scope.row.totalLeadtime}}天</span>
                          </div>
                          <div class="trimmedSize">
                            <span>单件工时：</span>
                            <el-input v-show="item.boolEdit=='1'" class="el-input-quote" v-model="scope.row.cnc3dSinglehours">H</el-input>
                            <span v-show="item.boolEdit!='1'">{{ scope.row.cnc3dSinglehours}}H</span>
                          </div>
                          <div class="trimmedSize">
                            <span>手工工时：</span>
                            <el-input v-show="item.boolEdit=='1'" class="el-input-quote" v-model="scope.row.handSinglehours">H</el-input>
                            <span v-show="item.boolEdit!='1'">{{ scope.row.handSinglehours}}H</span>
                          </div>
                        </span>
                        <span v-else>
                          <div class="trimmedSize">
                            <span>生产周期：</span>
                            <span>{{ scope.row.totalLeadtime}}天</span>
                          </div>
                          <div class="trimmedSize">
                            <span>单件工时：</span>
                            <span>{{ scope.row.cnc3dSinglehours}}H</span>
                          </div>
                          <div class="trimmedSize">
                            <span>手工工时：</span>
                            <span>{{ scope.row.handSinglehours}}H</span>
                          </div>
                        </span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      v-else-if="item.columnName==='remarks'"
                      :width="item.columnWidth"
                      :key="item.columnName"
                      :prop="item.columnName"
                      :label="item.columnCname"
                      align="center"
                    >
                      <template slot-scope="scope">
                        <span v-if="scope.row.checkedColumn">
                          <textarea
                            v-show="item.boolEdit=='1'"
                            name
                            cols="10"
                            rows="5"
                            v-model="scope.row[item.columnName]"
                          ></textarea>
                          <span v-show="item.boolEdit!='1'">{{scope.row[item.columnName]}}</span>
                        </span>
                        <span v-else>{{scope.row[item.columnName]}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      v-else
                      :width="item.columnWidth"
                      :key="item.columnName"
                      :prop="item.columnName"
                      :label="item.columnCname"
                      align="center"
                    >
                      <template slot-scope="scope">
                        <span v-if="scope.row.checkedColumn">
                          <el-input v-show="item.boolEdit=='1'" class="el-input-quote" v-model="scope.row[item.columnName]"></el-input>
                          <span v-show="item.boolEdit!='1'">{{scope.row[item.columnName]}}</span>
                        </span>
                        <span v-else>{{scope.row[item.columnName]}}</span>
                      </template>
                    </el-table-column>
                  </template>
                </el-table>
                <!--复模-->
                <el-table
                  class="tableStyleQuotation"
                  v-show="twoTableShowVc"
                  show-summary
                  :summary-method="getTotalVc"
                  border
                  v-loading="loading"
                  :data="tableDataTwoVc"
                  @selection-change="selsChange"
                  style="width: 100%">
                  <template v-for="item in tHeadDataTwoVc">
                    <el-table-column
                      v-if="item.columnName==='imagenamePath'"
                      :width="item.columnWidth"
                      :key="item.columnName"
                      :label="item.columnCname"
                      align="center"
                    >
                      <template slot-scope="scope">
                        <div
                          :title="scope.row.attachmentOriginal3dname"
                          class="attachmentName"
                        >{{scope.row.attachmentOriginal3dname}}</div>
                        <div>
                          <span>复模</span>
                        </div>
                        <div>
                          <img
                            :title="scope.row.attachmentOriginal3dname"
                            style="width:70%;"
                            :src="scope.row.imagenamePath"
                            alt
                          />
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      v-else-if="item.columnName==='technologyCname'"
                      :width="item.columnWidth"
                      :key="item.columnName"
                      :label="item.columnCname"
                      align="center"
                    >
                      <template slot-scope="scope">
                        <span>
                          <div class="trimmedSize">
                            <span class="spanTitle">尺寸：</span>
                            <span>{{ scope.row.dimensionX}}*{{ scope.row.dimensionY}}*{{ scope.row.dimensionZ}}mm</span>
                          </div>
                          <div class="trimmedSize">
                            <span class="spanTitle">体积：</span>
                            <span>{{ scope.row.volume}}mm³</span>
                          </div>

                          <span v-if="scope.row.checkedColumn">
                            <div v-show="item.boolEdit=='1'" class="trimmedSize">
                              <span>加工方式：</span>
                              <span>
                                <el-select
                                  v-model="scope.row.technologyCname"
                                  filterable
                                  :title="scope.row.technologyCname"
                                  class="el-select-quote"
                                  placeholder="请选择"
                                  size="small"
                                >
                                  <el-option
                                    v-for="items in technologyList"
                                    :key="items.id"
                                    @click.native="checkTechnology(items)"
                                    :label="items.techName"
                                    :value="items.techName"
                                  ></el-option>
                                </el-select>
                              </span>
                            </div>
                            <div v-show="item.boolEdit=='1'" class="trimmedSize">
                              <span>灌注材料：</span>
                              <span>
                                <el-select
                                  v-model="scope.row.partMaterialCname"
                                  filterable
                                  :title="scope.row.partMaterialCname"
                                  class="el-select-quote"
                                  placeholder="请选择"
                                  size="small"
                                >
                                  <el-option
                                    v-for="items in materialList"
                                    :key="items.id"
                                    @click.native="checkMaterial(items)"
                                    :label="items.materialCname"
                                    :value="items.materialCname"
                                  ></el-option>
                                </el-select>
                              </span>
                            </div>

                            <div v-show="item.boolEdit!='1'" class="trimmedSize">
                              <span>加工方式：</span>
                              <span>{{ scope.row.technologyCname}}</span>
                            </div>
                            <div v-show="item.boolEdit!='1'" class="trimmedSize">
                              <span>灌注材料：</span>
                              <span>{{ scope.row.partMaterialCname}}</span>
                            </div>
                          </span>
                          <span v-else>
                            <div class="trimmedSize">
                              <span>加工方式：</span>
                              <span>{{ scope.row.technologyCname}}</span>
                            </div>
                            <div class="trimmedSize">
                              <span>灌注材料：</span>
                              <span>{{ scope.row.partMaterialCname}}</span>
                            </div>
                          </span>
                        </span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      v-else-if="item.columnName==='setParam'"
                      :width="item.columnWidth"
                      :key="item.columnName"
                      :label="item.columnCname"
                      align="center"
                    >
                      <template slot-scope="scope">
                        <span v-if="scope.row.checkedColumn">
                          <div class="trimmedSize">
                            <span>原型材料：</span>
                            <!-- <el-input v-show="item.boolEdit=='1'" v-model="scope.row.masterMaterialCname"></el-input> -->
                            <el-select
                              v-show="item.boolEdit=='1'"
                              v-model="scope.row.masterMaterialCname"
                              filterable
                              :title="scope.row.masterMaterialCname"
                              class="el-select-quote"
                              placeholder="请选择"
                              size="small"
                            >
                              <el-option
                                v-for="items in materialList"
                                :key="items.id"
                                @click.native="checkMaterial(items)"
                                :label="items.materialCname"
                                :value="items.materialCname"
                              ></el-option>
                            </el-select>
                            <span v-show="item.boolEdit!='1'">{{ scope.row.masterMaterialCname}}</span>
                          </div>
                          <div class="trimmedSize">
                            <span>硅膜材料：</span>
                            <!-- <el-input v-show="item.boolEdit=='1'" v-model="scope.row.moldMaterialCname"></el-input> -->
                            <el-select
                              v-show="item.boolEdit=='1'"
                              v-model="scope.row.moldMaterialCname"
                              class="el-select-quote"
                              filterable
                              :title="scope.row.moldMaterialCname"
                              placeholder="请选择"
                              size="small"
                            >
                              <el-option
                                v-for="items in moldMaterialList"
                                :key="items.id"
                                :label="items.materialCname"
                                :value="items.materialCname"
                              ></el-option>
                            </el-select>
                            <span v-show="item.boolEdit!='1'">{{ scope.row.moldMaterialCname}}</span>
                          </div>
                          <div class="trimmedSize">
                            <span>难度系数：</span>
                            <!-- <el-input v-show="item.boolEdit=='1'" v-model="scope.row.complexityName"></el-input> -->
                            <span>
                              <el-select
                                v-show="item.boolEdit=='1'"
                                v-model="scope.row.complexityName"
                                filterable
                                :title="scope.row.complexityName"
                                class="el-select-quote"
                                placeholder="请选择"
                                size="small"
                              >
                                <el-option
                                  v-for="items in ComplexityFunList"
                                  :key="items.id"
                                  :label="items.complexityCname"
                                  :value="items.complexityCname"
                                ></el-option>
                              </el-select>
                            </span>
                            <span v-show="item.boolEdit!='1'">{{ scope.row.complexityName}}</span>
                          </div>
                          <div class="trimmedSize">
                            <span class="divSpan">攻牙：</span>
                            <el-input v-show="item.boolEdit=='1'" class="el-input-quote" v-model="scope.row.threadQty"></el-input>
                            <span v-show="item.boolEdit!='1'">{{ scope.row.threadQty}}</span>
                          </div>
                          <div class="trimmedSize">
                            <span class="divSpan">公差：</span>
                            <!-- <el-input v-show="item.boolEdit=='1'" v-model="scope.row.tolerance"></el-input> -->
                            <span>
                              <el-select
                                v-show="item.boolEdit=='1'"
                                v-model="scope.row.tolerance"
                                filterable
                                :title="scope.row.tolerance"
                                class="el-select-quote"
                                placeholder="请选择"
                                size="small"
                              >
                                <el-option
                                  v-for="items in toleranceList"
                                  :key="items.id"
                                  :label="items.paramContent1"
                                  :value="items.paramContent1"
                                ></el-option>
                              </el-select>
                            </span>
                            <span v-show="item.boolEdit!='1'">{{ scope.row.tolerance}}</span>
                          </div>
                        </span>
                        <span v-else>
                          <div class="trimmedSize">
                            <span>原型材料：</span>
                            <span>{{ scope.row.masterMaterialCname}}</span>
                          </div>
                          <div class="trimmedSize">
                            <span>硅膜材料：</span>
                            <span>{{ scope.row.moldMaterialCname}}</span>
                          </div>
                          <div class="trimmedSize">
                            <span>难度系数：</span>
                            <span>{{ scope.row.complexityName}}</span>
                          </div>
                          <div class="trimmedSize">
                            <span class="divSpan">攻牙：</span>
                            <span>{{ scope.row.threadQty}}</span>
                          </div>
                          <div class="trimmedSize">
                            <span class="divSpan">公差：</span>
                            <span>{{ scope.row.tolerance}}</span>
                          </div>
                        </span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      v-else-if="item.columnName==='partMaterialCode'"
                      :width="item.columnWidth"
                      :key="item.columnName"
                      :label="item.columnCname"
                      align="center"
                    >
                      <template slot-scope="scope">
                        <span>
                          <div class="trimmedSize">
                            <span>后处理：</span>
                            <span v-if="scope.row.checkedColumn">
                              <el-input
                                v-show="item.boolEdit=='1'"
                                class="el-input-quote"
                                v-model="scope.row.finishqualityName"
                              ></el-input>
                              <span v-show="item.boolEdit!='1'">{{ scope.row.finishqualityName}}</span>
                            </span>
                            <span v-else>{{ scope.row.finishqualityName}}</span>
                          </div>
                        </span>
                      </template>
                    </el-table-column>

                    <el-table-column
                      v-else-if="item.columnName==='masterMaterialCode'"
                      :width="item.columnWidth"
                      :key="item.columnName"
                      :label="item.columnCname"
                      align="center"
                    >
                      <template slot-scope="scope">
                        <span v-if="scope.row.checkedColumn">
                          <div class="trimmedSize">
                            <span>生产周期：</span>
                            <el-input v-show="item.boolEdit=='1'" class="el-input-quote" v-model="scope.row.totalLeadtime">天</el-input>
                            <span v-show="item.boolEdit!='1'">{{ scope.row.totalLeadtime}}天</span>
                          </div>
                          <div class="trimmedSize">
                            <span>单件工时：</span>
                            <el-input v-show="item.boolEdit=='1'" class="el-input-quote" v-model="scope.row.cnc3dSinglehours">H</el-input>
                            <span v-show="item.boolEdit!='1'">{{ scope.row.cnc3dSinglehours}}H</span>
                          </div>
                          <div class="trimmedSize">
                            <span>手工工时：</span>
                            <el-input v-show="item.boolEdit=='1'" class="el-input-quote" v-model="scope.row.handSinglehours">H</el-input>
                            <span v-show="item.boolEdit!='1'">{{ scope.row.handSinglehours}}H</span>
                          </div>
                        </span>
                        <span v-else>
                          <div class="trimmedSize">
                            <span>生产周期：</span>
                            <span>{{ scope.row.totalLeadtime}}天</span>
                          </div>
                          <div class="trimmedSize">
                            <span>单件工时：</span>
                            <span>{{ scope.row.cnc3dSinglehours}}H</span>
                          </div>
                          <div class="trimmedSize">
                            <span>手工工时：</span>
                            <span>{{ scope.row.handSinglehours}}H</span>
                          </div>
                        </span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      v-else-if="item.columnName==='remarks'"
                      :width="item.columnWidth"
                      :key="item.columnName"
                      :prop="item.columnName"
                      :label="item.columnCname"
                      align="center"
                    >
                      <template slot-scope="scope">
                        <span v-if="scope.row.checkedColumn">
                          <textarea
                            v-show="item.boolEdit=='1'"
                            name
                            cols="10"
                            rows="5"
                            v-model="scope.row[item.columnName]"
                          ></textarea>
                          <span v-show="item.boolEdit!='1'">{{scope.row[item.columnName]}}</span>
                        </span>
                        <span v-else>{{scope.row[item.columnName]}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      v-else
                      :width="item.columnWidth"
                      :key="item.columnName"
                      :prop="item.columnName"
                      :label="item.columnCname"
                      align="center"
                    >
                      <template slot-scope="scope">
                        <span v-if="scope.row.checkedColumn">
                          <el-input v-show="item.boolEdit=='1'" class="el-input-quote" v-model="scope.row[item.columnName]"></el-input>
                          <span v-show="item.boolEdit!='1'">{{scope.row[item.columnName]}}</span>
                        </span>
                        <span v-else>{{scope.row[item.columnName]}}</span>
                      </template>
                    </el-table-column>
                  </template>
                </el-table>
                <!--快速模具-->
                <el-table
                  class="tableStyleQuotation"
                  :span-method="quoteSpanMethod"
                  v-show="twoTableShowFm"
                  show-summary
                  :summary-method="getTotalFm"
                  border
                  v-loading="loading"
                  :data="tableDataTwoFm"
                  @selection-change="selsChange"
                  style="width: 100%">
                  <template v-for="item in tHeadDataTwoFm">
                    <el-table-column
                      v-if="item.columnName==='imagenamePath'"
                      :width="item.columnWidth"
                      :key="item.id"
                      :label="item.columnCname"
                      align="center"
                    >
                      <template slot-scope="scope">
                        <div
                          :title="scope.row.attachmentOriginal3dname"
                          class="attachmentName"
                        >{{scope.row.attachmentOriginal3dname}}</div>
                        <div>
                          <span>快速模具</span>
                        </div>
                        <div>
                          <img
                            :title="scope.row.attachmentOriginal3dname"
                            style="width:70%;"
                            :src="scope.row.imagenamePath"
                            alt
                          />
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      v-else-if="item.columnName==='technologyCname'"
                      :width="item.columnWidth"
                      :key="item.id"
                      :label="item.columnCname"
                      align="center"
                    >
                      <template slot-scope="scope">
                        <span>
                          <div class="trimmedSize">
                            <span class="spanTitle">尺寸：</span>
                            <span>{{ scope.row.dimensionX}}*{{ scope.row.dimensionY}}*{{ scope.row.dimensionZ}}mm</span>
                          </div>
                          <div class="trimmedSize">
                            <span class="spanTitle">体积：</span>
                            <span>{{ scope.row.volume}}mm³</span>
                          </div>
                          <div class="trimmedSize">
                            <span class="spanTitle">重量：</span>
                            <span>{{ scope.row.weightsGm}}g</span>
                          </div>
                        </span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      v-else-if="item.columnName==='setParam'"
                      :width="item.columnWidth"
                      :key="item.id"
                      :label="item.columnCname"
                      align="center"
                    >
                      <template slot-scope="scope">
                        <span v-if="scope.row.checkedColumn">
                          <div class="trimmedSize">
                            <span>产品结构：</span>
                            <!-- <el-input v-show="item.boolEdit=='1'" v-model="scope.row.setupsCount"></el-input> -->
                            <span>
                              <el-select
                                v-show="item.boolEdit=='1'"
                                v-model="scope.row.complexityName"
                                filterable
                                :title="scope.row.complexityName"
                                placeholder="请选择"
                                size="small"
                                class="el-select-quote">
                                <el-option
                                  v-for="items in ComplexityFunList"
                                  :key="items.id"
                                  :label="items.complexityCname"
                                  :value="items.complexityCname"
                                ></el-option>
                              </el-select>
                            </span>
                            <span v-show="item.boolEdit!='1'">{{ scope.row.setupsCount}}</span>
                          </div>
                          <div class="trimmedSize">
                            <span>进胶类型：</span>
                            <!-- <el-input v-show="item.boolEdit=='1'" v-model="scope.row.complexityName"></el-input> -->
                            <span>
                              <el-select
                                v-show="item.boolEdit=='1'"
                                v-model="scope.row.mouldGateType"
                                filterable
                                :title="scope.row.mouldGateType"
                                placeholder="请选择"
                                class="el-select-quote"
                                size="small">
                                <el-option
                                  v-for="items in gateTypeList"
                                  :key="items.id"
                                  :label="items.paramContent1"
                                  :value="items.paramContent1"
                                ></el-option>
                              </el-select>
                            </span>
                            <span v-show="item.boolEdit!='1'">{{ scope.row.complexityName}}</span>
                          </div>
                          <div class="trimmedSize">
                            <span>表面处理：</span>
                            <el-input v-show="item.boolEdit=='1'" class="el-input-quote" v-model="scope.row.finishqualityName"></el-input>
                            <span v-show="item.boolEdit!='1'">{{ scope.row.finishqualityName}}</span>
                          </div>
                          <div class="trimmedSize">
                            <span class="divSpan">公差：</span>
                            <!-- <el-input v-show="item.boolEdit=='1'" v-model="scope.row.tolerance"></el-input> -->
                            <span>
                              <el-select
                                v-show="item.boolEdit=='1'"
                                v-model="scope.row.tolerance"
                                filterable
                                :title="scope.row.tolerance"
                                placeholder="请选择"
                                class="el-select-quote"
                                size="small">
                                <el-option
                                  v-for="items in toleranceList"
                                  :key="items.id"
                                  :label="items.paramContent1"
                                  :value="items.paramContent1"
                                ></el-option>
                              </el-select>
                            </span>
                            <span v-show="item.boolEdit!='1'">{{ scope.row.tolerance}}</span>
                          </div>
                        </span>
                        <span v-else>
                          <div class="trimmedSize">
                            <span>产品结构：</span>
                            <span>{{ scope.row.complexityName}}</span>
                          </div>
                          <div class="trimmedSize">
                            <span>进胶类型：</span>
                            <span>{{ scope.row.mouldGateType}}</span>
                          </div>
                          <div class="trimmedSize">
                            <span>表面处理：</span>
                            <span>{{ scope.row.finishqualityName}}</span>
                          </div>
                          <div class="trimmedSize">
                            <span class="divSpan">公差：</span>
                            <span>{{ scope.row.tolerance}}</span>
                          </div>
                        </span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      v-else-if="item.columnName==='materialRequire'"
                      :width="item.columnWidth"
                      :key="item.id"
                      :label="item.columnCname"
                      align="center"
                    >
                      <template slot-scope="scope">
                        <span v-if="scope.row.checkedColumn">
                          <div class="trimmedSize">
                            <span>膜仁材料：</span>
                            <!-- <el-input v-show="item.boolEdit=='1'" v-model="scope.row.masterMaterialCname"></el-input> -->
                            <el-select
                              v-show="item.boolEdit=='1'"
                              v-model="scope.row.masterMaterialCname"
                              filterable
                              :title="scope.row.masterMaterialCname"
                              class="el-select-quote"
                              placeholder="请选择"
                              size="small"
                            >
                              <el-option
                                v-for="items in CaviMaList"
                                :key="items.id"
                                :label="items.materialCname"
                                :value="items.materialCname"
                              ></el-option>
                            </el-select>
                            <span v-show="item.boolEdit!='1'">{{ scope.row.masterMaterialCname}}</span>
                          </div>
                          <div class="trimmedSize">
                            <span>膜坯材料：</span>
                            <!-- <el-input v-show="item.boolEdit=='1'" v-model="scope.row.moldMaterialCname"></el-input> -->
                            <el-select
                              v-show="item.boolEdit=='1'"
                              v-model="scope.row.moldMaterialCname"
                              filterable
                              :title="scope.row.moldMaterialCname"
                              class="el-select-quote"
                              placeholder="请选择"
                              size="small"
                            >
                              <el-option
                                v-for="items in MoldMaList"
                                :key="items.id"
                                :label="items.materialCname"
                                :value="items.materialCname"
                              ></el-option>
                            </el-select>
                            <span v-show="item.boolEdit!='1'">{{ scope.row.moldMaterialCname}}</span>
                          </div>
                          <div class="trimmedSize">
                            <span>产品材料：</span>
                            <!-- <el-input v-show="item.boolEdit=='1'" v-model="scope.row.partMaterialCname"></el-input> -->
                            <el-select
                              v-show="item.boolEdit=='1'"
                              v-model="scope.row.partMaterialCname"
                              filterable
                              :title="scope.row.partMaterialCname"
                              class="el-select-quote"
                              placeholder="请选择"
                              size="small"
                            >
                              <el-option
                                v-for="items in materialList"
                                :key="items.id"
                                :label="items.materialCname"
                                :value="items.materialCname"
                              ></el-option>
                            </el-select>
                            <span v-show="item.boolEdit!='1'">{{ scope.row.partMaterialCname}}</span>
                          </div>
                          <div class="trimmedSize">
                            <span>产品颜色：</span>
                            <!-- <el-input v-show="item.boolEdit=='1'" v-model="scope.row.mouldPartColor"></el-input> -->
                            <el-select
                              v-show="item.boolEdit=='1'"
                              v-model="scope.row.mouldPartColor"
                              filterable
                              :title="scope.row.mouldPartColor"
                              class="el-select-quote"
                              placeholder="请选择"
                              size="small"
                            >
                              <el-option
                                v-for="items in productColourList"
                                :key="items.id"
                                :label="items.paramContent1"
                                :value="items.paramContent1"
                              ></el-option>
                            </el-select>
                            <span v-show="item.boolEdit!='1'">{{ scope.row.mouldPartColor}}</span>
                          </div>
                        </span>
                        <span v-else>
                          <div class="trimmedSize">
                            <span>膜仁材料：</span>
                            <span>{{ scope.row.masterMaterialCname}}</span>
                          </div>
                          <div class="trimmedSize">
                            <span>膜坯材料：</span>
                            <span>{{ scope.row.moldMaterialCname}}</span>
                          </div>
                          <div class="trimmedSize">
                            <span>产品材料：</span>
                            <span>{{ scope.row.partMaterialCname}}</span>
                          </div>
                          <div class="trimmedSize">
                            <span>产品颜色：</span>
                            <span>{{ scope.row.mouldPartColor}}</span>
                          </div>
                        </span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      v-else-if="item.columnName==='moldRequire'"
                      :width="item.columnWidth"
                      :key="item.id"
                      :label="item.columnCname"
                      align="center"
                    >
                      <template slot-scope="scope">
                        <span v-if="scope.row.checkedColumn">
                          <div class="trimmedSize">
                            <span>膜坯类型：</span>
                            <!-- <el-input v-show="item.boolEdit=='1'" v-model="scope.row.mouldBaseType"></el-input> -->
                            <el-select
                              v-show="item.boolEdit=='1'"
                              v-model="scope.row.mouldBaseType"
                              filterable
                              :title="scope.row.mouldBaseType"
                              class="el-select-quote"
                              placeholder="请选择"
                              size="small"
                            >
                              <el-option
                                v-for="items in mouldBaseTypeList"
                                :key="items.id"
                                :label="items.paramContent1"
                                :value="items.paramContent1"
                              ></el-option>
                            </el-select>
                            <span v-show="item.boolEdit!='1'">{{ scope.row.mouldBaseType}}</span>
                          </div>
                          <div class="trimmedSize">
                            <span>行位个数：</span>
                            <!-- <el-input v-show="item.boolEdit=='1'" v-model="scope.row.mouldSlideCount"></el-input> -->
                            <el-select
                              v-show="item.boolEdit=='1'"
                              v-model="scope.row.mouldSlideCount"
                              filterable
                              :title="scope.row.mouldSlideCount"
                              class="el-select-quote"
                              placeholder="请选择"
                              size="small"
                            >
                              <el-option
                                v-for="items in lineCountList"
                                :key="items.id"
                                :label="items.paramContent1"
                                :value="items.paramContent1"
                              ></el-option>
                            </el-select>
                            <span v-show="item.boolEdit!='1'">{{ scope.row.mouldSlideCount}}</span>
                          </div>
                          <div class="trimmedSize">
                            <span>斜顶个数：</span>
                            <!-- <el-input v-show="item.boolEdit=='1'" v-model="scope.row.mouldLifterCount"></el-input> -->
                            <el-select
                              v-show="item.boolEdit=='1'"
                              v-model="scope.row.mouldLifterCount"
                              filterable
                              class="el-select-quote"
                              :title="scope.row.mouldLifterCount"
                              placeholder="请选择"
                              size="small"
                            >
                              <el-option
                                v-for="items in pentroofCountList"
                                :key="items.id"
                                :label="items.paramContent1"
                                :value="items.paramContent1"
                              ></el-option>
                            </el-select>
                            <span v-show="item.boolEdit!='1'">{{ scope.row.mouldLifterCount}}</span>
                          </div>
                          <div class="trimmedSize">
                            <span>手动镶件：</span>
                            <el-input v-show="item.boolEdit=='1'" class="el-input-quote" v-model="scope.row.mouldInsertCount"></el-input>
                            <span v-show="item.boolEdit!='1'">{{ scope.row.mouldInsertCount}}</span>
                          </div>
                        </span>
                        <span v-else>
                          <div class="trimmedSize">
                            <span>膜坯类型：</span>
                            <span>{{ scope.row.mouldBaseType}}</span>
                          </div>
                          <div class="trimmedSize">
                            <span>行位个数：</span>
                            <span>{{ scope.row.mouldSlideCount}}</span>
                          </div>
                          <div class="trimmedSize">
                            <span>斜顶个数：</span>
                            <span>{{ scope.row.mouldLifterCount}}</span>
                          </div>
                          <div class="trimmedSize">
                            <span>手动镶件：</span>
                            <span>{{ scope.row.mouldInsertCount}}</span>
                          </div>
                        </span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      v-else-if="item.columnName==='otherRequire'"
                      :width="item.columnWidth"
                      :key="item.id"
                      :label="item.columnCname"
                      align="center"
                    >
                      <template slot-scope="scope">
                        <span v-if="scope.row.checkedColumn">
                          <div class="trimmedSize">
                            <span>穴数：</span>
                            <!-- <el-input v-show="item.boolEdit=='1'" v-model="scope.row.mouldCavitiesCount"></el-input> -->
                            <el-select
                              v-show="item.boolEdit=='1'"
                              v-model="scope.row.mouldCavitiesCount"
                              filterable
                              :title="scope.row.mouldCavitiesCount"
                              class="el-select-quote"
                              placeholder="请选择"
                              size="small"
                            >
                              <el-option
                                v-for="items in hillCountList"
                                :key="items.id"
                                :label="items.paramContent1"
                                :value="items.paramContent1"
                              ></el-option>
                            </el-select>
                            <span v-show="item.boolEdit!='1'">{{ scope.row.mouldCavitiesCount}}</span>
                          </div>
                          <div class="trimmedSize">
                            <span>热嘴个数：</span>
                            <!-- <el-input v-show="item.boolEdit=='1'" v-model="scope.row.mouldHotsprueCount"></el-input> -->
                            <el-select
                              v-show="item.boolEdit=='1'"
                              v-model="scope.row.mouldHotsprueCount"
                              filterable
                              :title="scope.row.mouldHotsprueCount"
                              class="el-select-quote"
                              placeholder="请选择"
                              size="small"
                            >
                              <el-option
                                v-for="items in hotCountList"
                                :key="items.id"
                                :label="items.paramContent1"
                                :value="items.paramContent1"
                              ></el-option>
                            </el-select>
                            <span v-show="item.boolEdit!='1'">{{ scope.row.mouldHotsprueCount}}</span>
                          </div>
                          <div class="trimmedSize">
                            <span>模具寿命：</span>
                            <!-- <el-input v-show="item.boolEdit=='1'" v-model="scope.row.mouldTimes"></el-input> -->
                            <el-select
                              v-show="item.boolEdit=='1'"
                              v-model="scope.row.mouldTimes"
                              class="el-select-quote"
                              filterable
                              :title="scope.row.mouldTimes"
                              placeholder="请选择"
                              size="small"
                            >
                              <el-option
                                v-for="items in dieLifeList"
                                :key="items.id"
                                :label="items.paramContent1"
                                :value="items.paramContent1"
                              ></el-option>
                            </el-select>
                            <span v-show="item.boolEdit!='1'">{{ scope.row.mouldTimes}}</span>
                          </div>
                          <div class="trimmedSize">
                            <span>交期：</span>
                            <el-input v-show="item.boolEdit=='1'" class="el-input-quote" v-model="scope.row.totalLeadtime">天</el-input>
                            <span v-show="item.boolEdit!='1'">{{ scope.row.totalLeadtime}}天</span>
                          </div>
                        </span>
                        <span v-else>
                          <div class="trimmedSize">
                            <span>穴数：</span>
                            <span>{{ scope.row.mouldCavitiesCount}}</span>
                          </div>
                          <div class="trimmedSize">
                            <span>热嘴个数：</span>
                            <span>{{ scope.row.mouldHotsprueCount}}</span>
                          </div>
                          <div class="trimmedSize">
                            <span>模具寿命：</span>
                            <span>{{ scope.row.mouldTimes}}</span>
                          </div>
                          <div class="trimmedSize">
                            <span>交期：</span>
                            <span>{{ scope.row.totalLeadtime}}天</span>
                          </div>
                        </span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      v-else-if="item.columnName==='partMaterialCode'"
                      :width="item.columnWidth"
                      :key="item.id"
                      :label="item.columnCname"
                      align="center"
                    >
                      <template slot-scope="scope">
                        <span>
                          <div class="trimmedSize">
                            <span>后处理：</span>
                            <span v-if="scope.row.checkedColumn">
                              <el-input
                                v-show="item.boolEdit=='1'"
                                class="el-input-quote"
                                v-model="scope.row.finishqualityName"
                              ></el-input>
                              <span v-show="item.boolEdit!='1'">{{ scope.row.finishqualityName}}</span>
                            </span>
                            <span v-else>{{ scope.row.finishqualityName}}</span>
                          </div>
                        </span>
                      </template>
                    </el-table-column>

                    <el-table-column
                      v-else-if="item.columnName==='masterMaterialCode'"
                      :width="item.columnWidth"
                      :key="item.id"
                      :label="item.columnCname"
                      align="center"
                    >
                      <template slot-scope="scope">
                        <span v-if="scope.row.checkedColumn">
                          <div class="trimmedSize">
                            <span>生产周期：</span>
                            <el-input v-show="item.boolEdit=='1'" class="el-input-quote" v-model="scope.row.totalLeadtime">天</el-input>
                            <span v-show="item.boolEdit!='1'">{{ scope.row.totalLeadtime}}天</span>
                          </div>
                          <div class="trimmedSize">
                            <span>单件工时：</span>
                            <el-input v-show="item.boolEdit=='1'" class="el-input-quote" v-model="scope.row.cnc3dSinglehours">H</el-input>
                            <span v-show="item.boolEdit!='1'">{{ scope.row.cnc3dSinglehours}}H</span>
                          </div>
                          <div class="trimmedSize">
                            <span>手工工时：</span>
                            <el-input v-show="item.boolEdit=='1'" class="el-input-quote" v-model="scope.row.handSinglehours">H</el-input>
                            <span v-show="item.boolEdit!='1'">{{ scope.row.handSinglehours}}H</span>
                          </div>
                        </span>
                        <span v-else>
                          <div class="trimmedSize">
                            <span>生产周期：</span>
                            <span>{{ scope.row.totalLeadtime}}天</span>
                          </div>
                          <div class="trimmedSize">
                            <span>单件工时：</span>
                            <span>{{ scope.row.cnc3dSinglehours}}H</span>
                          </div>
                          <div class="trimmedSize">
                            <span>手工工时：</span>
                            <span>{{ scope.row.handSinglehours}}H</span>
                          </div>
                        </span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      v-else-if="item.columnName==='remarks'"
                      :width="item.columnWidth"
                      :key="item.id"
                      :prop="item.columnName"
                      :label="item.columnCname"
                      align="center"
                    >
                      <template slot-scope="scope">
                        <span v-if="scope.row.checkedColumn">
                          <textarea
                            v-show="item.boolEdit=='1'"
                            name
                            cols="10"
                            rows="5"
                            v-model="scope.row[item.columnName]"
                          ></textarea>
                          <span v-show="item.boolEdit!='1'">{{scope.row[item.columnName]}}</span>
                        </span>
                        <span v-else>{{scope.row[item.columnName]}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      v-else
                      :width="item.columnWidth"
                      :key="item.id"
                      :prop="item.columnName"
                      :label="item.columnCname"
                      align="center"
                    >
                      <template slot-scope="scope">
                        <span v-if="scope.row.checkedColumn">
                          <el-input v-show="item.boolEdit=='1'" class="el-input-quote" v-model="scope.row[item.columnName]"></el-input>
                          <span v-show="item.boolEdit!='1'">{{scope.row[item.columnName]}}</span>
                        </span>
                        <span v-else>{{scope.row[item.columnName]}}</span>
                      </template>
                    </el-table-column>
                  </template>
                </el-table>
                <el-table v-show="footShow" border v-loading="loading" :show-header = "false" :data="countData"  style="width: 100%;margin-bottom: 10px;">
                  <el-table-column prop="counts" align="center">
                      <template slot-scope="scope">
                          <div class="footerCount">{{scope.row.counts}}</div>
                      </template>
                  </el-table-column>
                  <el-table-column prop="weight" align="center">
                    <template slot-scope="scope">
                          <div class="footerCount">{{scope.row.weight}}</div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="totalQty"  align="center">
                    <template slot-scope="scope">
                          <div class="footerCount">{{scope.row.totalQty}}</div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="zhePrice"  align="center">
                    <template slot-scope="scope">
                          <div class="footerCount">{{scope.row.zhePrice}}</div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="yuanPrice" align="center">
                    <template slot-scope="scope">
                          <div class="footerCount">{{scope.row.yuanPrice}}</div>
                    </template>
                  </el-table-column>
                </el-table>
              </el-form>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100" align="center">
          <template scope="scope" >
            <span v-for="(oper1,index) in oneOperation" :key="oper1.id">
              <span>
                  <el-button class="operSpan" v-if="oper1.operationCode==='btnpickup'" :title="oper1.operationName" :id="oper1.operationCode" size="small" @click="grabTable(scope.$index, scope.row)">{{oper1.operationName}}</el-button>
              </span>
            </span>
          </template>
			  </el-table-column>
        <template v-for="item in tHeadDataOne">
          <el-table-column
            v-if="item.columnName==='quotationNo'"
            :width="item.columnWidth"
            :key="item.id"
            :label="item.columnCname"
            align="center"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.checkedColumn">
                <el-input v-show="item.boolEdit=='1'" class="el-input-quote" v-model="scope.row.quotationNo"></el-input>
                <span v-show="item.boolEdit!='1'">{{scope.row.quotationNo}}</span>
              </span>
              <span v-else>
                <span v-if="item.boolActivity=='1'">
                  <p
                    style="cursor: pointer;"
                    @click="getQuotationNo(scope.row.id)"
                    :title="item.columnCname"
                  >{{scope.row.quotationNo}}</p>
                </span>
                <span v-else>
                  <p id="none">{{scope.row.quotationNo}}</p>
                </span>
              </span>
            </template>
          </el-table-column>
          <el-table-column
            v-else-if="item.columnName==='contactCode'"
            :width="item.columnWidth"
            :key="item.id"
            :label="item.columnCname"
            align="center"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.checkedColumn">
                <el-select
                  v-show="item.boolEdit=='1'"
                  v-model="scope.row.contactCode"
                  class="el-select-quote"
                  filterable
                  :title="scope.row.contactCode"
                  placeholder="请选择"
                  size="small"
                >
                  <el-option
                    v-for="items in CustomerList"
                    :key="items.id"
                    :label="items.contactCode"
                    :value="items.contactCode"
                  ></el-option>
                </el-select>
                <span v-show="item.boolEdit!='1'">{{scope.row.contactCode}}</span>
              </span>
              <span v-else>
                <span v-if="item.boolActivity=='1'">
                  <p
                    style="cursor: pointer;"
                    @click="getcontactCode(scope.row.id,scope.row.customerCode,scope.row.contactCode)"
                    :title="item.columnCname"
                  >{{scope.row.contactCode}}</p>
                </span>
                <span v-else>
                  <p id="none">{{scope.row.contactCode}}</p>
                </span>
              </span>
            </template>
          </el-table-column>
          <el-table-column
            v-else-if="item.columnName==='salesRemarks'"
            :width="item.columnWidth"
            :key="item.id"
            :label="item.columnCname"
            align="center"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.checkedColumn">
                <textarea
                  v-show="item.boolEdit=='1'"
                  name
                  cols="10"
                  rows="5"
                  v-model="scope.row[item.columnName]"
                ></textarea>
                <span v-show="item.boolEdit!='1'">{{scope.row[item.columnName]}}</span>
              </span>
              <span v-else>{{scope.row[item.columnName]}}</span>
            </template>
          </el-table-column>
          <el-table-column
            v-else-if="item.columnName==='statusCname'"
            :width="item.columnWidth"
            :key="item.id"
            :prop="item.columnName"
            :label="item.columnCname"
            align="center"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.checkedColumn">
                <el-input v-show="item.boolEdit=='1'" class="el-input-quote" v-model="scope.row[item.columnName]"></el-input>
                <span style="color:blue;" v-show="item.boolEdit!='1'">{{scope.row[item.columnName]}}</span>
              </span>
              <span style="color:blue;" v-else>{{scope.row[item.columnName]}}</span>
            </template>
          </el-table-column>
          <el-table-column
            v-else-if="item.columnName==='pmCname'"
            :width="item.columnWidth"
            :key="item.id"
            :prop="item.columnName"
            :label="item.columnCname"
            align="center"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.checkedColumn">
                <!-- <el-input v-show="item.boolEdit=='1'" v-model="scope.row[item.columnName]"></el-input> -->
                <el-select
                  v-show="item.boolEdit=='1'"
                  v-model="scope.row.pmCname"
                  class="el-select-quote"
                  filterable
                  :title="scope.row.pmCname"
                  placeholder="请选择"
                  size="small"
                >
                  <el-option
                    v-for="items in EmployeeList"
                    :key="items.id"
                    :label="items.employeeCname"
                    :value="items.employeeCode"
                  ></el-option>
                </el-select>

                <span v-show="item.boolEdit!='1'">{{scope.row[item.columnName]}}</span>
              </span>
              <span v-else>{{scope.row[item.columnName]}}</span>
            </template>
          </el-table-column>
          <el-table-column
            v-else
            :width="item.columnWidth"
            :key="item.id"
            :prop="item.columnName"
            :label="item.columnCname"
            align="center"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.checkedColumn">
                <el-input v-show="item.boolEdit=='1'" class="el-input-quote" v-model="scope.row[item.columnName]"></el-input>
                <span v-show="item.boolEdit!='1'">{{scope.row[item.columnName]}}</span>
              </span>
              <span v-else>{{scope.row[item.columnName]}}</span>
            </template>
          </el-table-column>
        </template>     
        <el-table-column label="其它" width="" align="center">
          <template scope="scope" >
            <div style="margin-bottom: 5px;" v-for="(oper3,index) in oneOperation" :key="oper3.id">
              <el-button class="operSpan" v-if="oper3.operationCode==='viewquotation'" :id="oper3.operationCode" size="small" @click="viewquotation(scope.$index, scope.row)">{{oper3.operationName}}</el-button>
              <el-button class="operSpan" v-if="oper3.operationCode==='downloadAttachments'" :id="oper3.operationCode" size="small" @click="downloadAttachments(scope.$index, scope.row)">{{oper3.operationName}}</el-button>
            </div>
          </template>
			  </el-table-column>
      </el-table>
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[15, 20, 30]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </div>

    <!--客户编号-->
    <el-dialog :title="dialogTitle" :visible.sync="dialog" width="700px" class="customerDialog">
        <el-form :model="initDialogForm" :inline="true" size="mini">
          <el-form-item label="公司名称">
            <el-input v-model="initDialogForm.customerFullname" disabled="disabled" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="联系方式">
            <el-input v-model="initDialogForm.contactPhone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="公司编号">
            <el-input v-model="initDialogForm.customerCode" disabled="disabled" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="initDialogForm.mailAddress" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="联系人">
            <el-input v-model="initDialogForm.contactCname" disabled="disabled" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="付款方式">
            <el-input v-model="initDialogForm.paymentCode" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="联系人编号">
            <el-input v-model="initDialogForm.contactCode" disabled="disabled" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="收货地址">
            <el-input v-model="initDialogForm.address" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" style="display: none;" class="dialog-footer">
          <el-button type="primary" @click="submitDialogData" size="small">确 定</el-button>
          <el-button @click="dialog = false" size="small">取 消</el-button>
        </div>
    </el-dialog>

    <!--报价单号-->
    <el-dialog :title="dialogTitle" :visible.sync="dialogQuo" width="400px" class="customerDialog">
        <el-form :inline="true" size="mini">
          <el-form-item label="公    仔：">
            <el-switch style="width:140px;" v-model="boolDoll" active-text="是" inactive-text="否"></el-switch>
          </el-form-item>
          <el-form-item label="材料证明：">
            <el-switch style="width:140px;" v-model="boolMaterial" active-text="需要" inactive-text="不需要"></el-switch>
          </el-form-item>
          <el-form-item label="样品申请：">
            <el-switch style="width:140px;" v-model="boolSample" active-text="是" inactive-text="否"></el-switch>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <span v-for="item in toolsList" style="margin-right:10px;" :key="item.id">
            <el-button type="primary" @click="submitDialogData" size="small">{{item.operationName}}</el-button>
          </span>
          <el-button @click="dialogQuo = false" size="small">取 消</el-button>
        </div>
    </el-dialog>

    <!--查看报价单-->
    <el-dialog :title="dialogTitle" :visible.sync="dialogView" width="800px" class="customerDialog">
        <el-form :inline="true" size="mini">
          <el-table :data="viewQuotationList" border v-loading="loadingView">
            <el-table-column type="index" label="序号" width="60" align="center" >
            </el-table-column>
            <el-table-column prop="quotationNo" label="报价单号" width="120" align="center" >
            </el-table-column>
            <el-table-column prop="customerFullname" label="客户名称" width="180" align="center" >
            </el-table-column>
            <el-table-column prop="createdTime" label="生成时间" width="180" align="center" :formatter="formatTime" >
            </el-table-column>
            <el-table-column label="查看详情" align="center">
              <template scope="scope">
                <el-button size="small" type="primary" @click="handleChinese(scope.$index, scope.row)">中文</el-button>
                <el-button size="small" type="primary" @click="handleEnglish(scope.$index, scope.row)">英文</el-button>
              </template>
            </el-table-column> 
          </el-table>
        </el-form>
    </el-dialog>

    <!--上传附件-->
    <el-dialog :title="dialogTitle" :visible.sync="dialogAtt" width="800px" class="customerDialog">
      <span v-for="item in attachmentList" class="imgBorder" :key="item.id" :title="item.attachmentOriginalname">
        <span :id="item.id" class="attachmentClose" title="删除" @click="delAttachment($event)">×</span>
        <img id="attachImg" src="../../assets/image/files.png" />
        <div class="attachmentName">{{item.attachmentOriginalname}}</div>
      </span>
      <span class="imgBorder" @click="$refs.inputFile.click()">
        <img id="attachImgFile" src="../../assets/image/uploadfile.png" title="上传文件"/>
      </span>
      <input style="display:none;" class="file" ref="inputFile" name="fileAtt" type="file" multiple="multiple" @change="fileUpload"/>
      
    </el-dialog>
    
  
  </div>
</template>

<script>
  export { default } from './grab'
</script>

<style lang="less">
  // @import './grab.less';
  @import './css/style.less';
</style>

