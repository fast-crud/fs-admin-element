<template>
  <fs-page>
    <template #header>
      <div class="title">独立使用组件</div>
      <div class="more"></div>
    </template>
    <div style="padding: 20px; width: 50%">
      <el-form ref="formRef" :model="form" label-width="150px">
        <el-form-item label="上传">
          <fs-file-uploader v-model="form.upload" :uploader="uploader" />
        </el-form-item>
        <el-form-item label="裁剪">
          <fs-cropper-uploader v-model="form.avatar" v-bind="cropperUploader" />
        </el-form-item>
        <el-form-item label="可复制">
          <fs-copyable v-model="form.copyable" />
        </el-form-item>
        <el-form-item label="人性化时间">
          <fs-time-humanize v-model="form.humanizeTime" />
          = {{ form.humanizeTime.format("YYYY-MM-DD HH:mm:ss") }}
        </el-form-item>
        <el-form-item label="dict-select">
          <fs-dict-select v-model="form.select" :dict="dictRef" />
        </el-form-item>
        <el-form-item label="使用上传方法">
          <input type="file" @change="fileUploaderChange" />
          <a v-if="signedUrl" :href="signedUrl" target="_blank">下载</a>
        </el-form-item>
        <el-form-item>
          <el-button @click="submit">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </fs-page>
</template>

<script lang="ts" setup>
import { defineOptions, reactive, ref } from "vue";
import { dict, useUi } from "@fast-crud/fast-crud";
import dayjs from "dayjs";
import { FsUploaderS3, loadUploader, useUploader } from "@fast-crud/fast-extends";

defineOptions({
  name: "ComponentIndependent"
});
const form = reactive({
  upload: [],
  avatar: undefined,
  copyable: "可复制的内容",
  select: 1,
  humanizeTime: dayjs(new Date().getTime() - 100000)
});

const uploader = ref({
  type: "cos",
  keepName: true
});

const cropperUploader = ref({
  uploader: {
    type: "cos",
    keepName: true
  },
  cropper: {
    viewMode: 1
  },
  async onReady(context: any) {
    console.log("onReady", context);
    context.zoom(-0.1);
    context.zoom(-0.1);
    context.zoom(-0.1);
  }
});

const dictRef = dict({
  data: [
    { label: "选项1", value: 1 },
    { label: "选项2", value: 2 },
    { label: "选项3", value: 3 }
  ]
});
const { ui } = useUi();
const signedUrl = ref();
async function fileUploaderChange(event: any) {
  const file = event.target.files[0];
  //异步加载上传组件
  const s3Uploader = await loadUploader<FsUploaderS3>("s3");
  const res = await s3Uploader.upload({
    file,
    fileName: file.name,
    onProgress(progress: any) {
      console.log("progress:" + progress.percent + "%");
    }
  });
  ui.message.info("upload success；" + JSON.stringify(res));
  //构建下载地址
  const { getConfig } = useUploader();
  const s3Config = getConfig("s3");
  const url = await s3Uploader.buildSignedUrl(s3Config, res.key, "get");
  signedUrl.value = url;
}

function submit() {
  ui.message.info("submit:" + JSON.stringify(form));
  console.log("submit:", form);
}
</script>
