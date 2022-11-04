package com.example.quesionsender;

import android.app.AlertDialog;
import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.provider.Settings.Secure;
import android.util.Log;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import com.google.zxing.integration.android.IntentIntegrator;
import com.google.zxing.integration.android.IntentResult;

public class MainActivity extends AppCompatActivity {

    public String getUrlqrcode() {
        return urlqrcode;
    }

    public void setUrlqrcode(String urlqrcode) {
        // descomentar a linha abaixo
        //this.urlqrcode = "http://192.168.0.104:3000/questionsforanswer/"+urlqrcode+"/secret/82ad4f00-0d34-11ed-861d-0242ac120002";
        this.urlqrcode = urlqrcode;
        if(urlqrcode != null && webview != null){
            webview.loadUrl(this.urlqrcode);
        }
    }

    private String urlqrcode;

    public String getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(String deviceId) {
        this.deviceId = deviceId;
    }

    private String deviceId;

    WebView webview;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        this.setDeviceId(Secure.getString(getContentResolver(), Secure.ANDROID_ID));
        webview = findViewById(R.id.page);
        webview.setWebViewClient(new WebViewClient());
        webview.getSettings().setJavaScriptEnabled(true);
        webview.getSettings().setDomStorageEnabled(true);
        // remover a linha abaixo
        this.setUrlqrcode("http://192.168.0.114:3000/questionsforanswer/deviceIdTeste/4/companyuid/64f84007-323d-4865-8ce9-7ec5955e0044/secret/82ad4f00-0d34-11ed-861d-0242ac120002");

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
            WebView.setWebContentsDebuggingEnabled(true);
        }
        // REMOVER O COMENTÁRIO, TESTE
        //IntentIntegrator.initiateScan( this );

    }
    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        IntentResult result = IntentIntegrator.parseActivityResult(requestCode, resultCode, data);
        String teste = result.getContents();
        if(result != null){
            if(result.getContents() != null){
                Log.d("CODIGO BARRAS",result.getContents());
                 this.setUrlqrcode(deviceId+"/"+result.getContents());
                //this.setUrlqrcode("https://www.google.com/search?q="+deviceId+result.getContents());
            } else {
                alert("Cancelado");
            }
        }
    }

    private void alert(String msg){
        Toast.makeText(getApplicationContext(), msg, Toast.LENGTH_LONG);
    }
}