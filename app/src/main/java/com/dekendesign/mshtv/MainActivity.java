package com.dekendesign.mshtv;

import android.content.Context;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.Bundle;
import android.util.Log;
import android.view.textclassifier.TextLinks;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import com.dekendesign.mshtv.databinding.ActivityMainBinding;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.net.NetworkInterface;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

public class MainActivity extends AppCompatActivity {

    private ActivityMainBinding binding;
    public static final String TAG = MainActivity.class.getSimpleName();
    private JSONObject campInfo;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityMainBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());
        String url = getString(R.string.store_url);

        if (isNetworkavailable()) {
            OkHttpClient client = new OkHttpClient();
            Request request = new Request.Builder().url(url).build();

            Call call = client.newCall(request);
            call.enqueue(new Callback() {
                @Override
                public void onFailure(@NonNull Call call, @NonNull IOException e) {

                }

                @Override
                public void onResponse(@NonNull Call call, @NonNull Response response) throws IOException {
                    try {
                        String jsonData = response.body().string();
                        Log.v(TAG, jsonData);
                        if (response.isSuccessful()) {
                            campInfo = getCampPageInfo(jsonData);
                        } else {
                            alertUserAboutError();
                        }
                    } catch (IOException e) {
                        Log.e(TAG, "IO Exception caught: ", e);
                    } catch (JSONException e) {
                        Log.e(TAG, "JSON Execption caught", e);
                    }
                }


            });
        }
    }

    private JSONObject getCampPageInfo(String jsonData) throws JSONException {
        JSONObject pageInfo = new JSONObject(jsonData);
        String mainContent = pageInfo.getString("website");
        Log.i(TAG, "From json with main content: " + mainContent);
        return pageInfo;
    }

    private boolean isNetworkavailable() {

        ConnectivityManager manager = (ConnectivityManager) getSystemService(Context.CONNECTIVITY_SERVICE);
        NetworkInfo networkInfo = manager.getActiveNetworkInfo();

        boolean isAvailable = false;
        if(networkInfo != null && networkInfo.isConnected()){
            isAvailable = true;
        } else {
            Toast.makeText(this, R.string.network_unavailable_message, Toast.LENGTH_LONG).show();
        }
        return isAvailable;

    }

    private void alertUserAboutError() {
        AlertDialogFragment dialog = new AlertDialogFragment();
        dialog.show(getFragmentManager(), "error_dialog");
    }
}