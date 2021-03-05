package com.skyperdrive;

import android.app.ProgressDialog;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.res.Configuration;
import android.location.Location;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.text.SpannableString;
import android.text.Spanned;
import android.text.style.AbsoluteSizeSpan;
import android.util.Log;
import android.view.View;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.IdRes;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.app.AppCompatDelegate;
import androidx.appcompat.widget.Toolbar;
import androidx.coordinatorlayout.widget.CoordinatorLayout;

import com.apollographql.apollo.ApolloCall;
import com.apollographql.apollo.ApolloClient;
import com.apollographql.apollo.exception.ApolloException;
import com.apollographql.apollo.skiperdrive.ModificarViajeMutation;
import com.facebook.react.bridge.ReactContext;
import com.google.android.material.bottomsheet.BottomSheetBehavior;
import com.google.gson.JsonObject;
import com.mapbox.api.directions.v5.DirectionsCriteria;
import com.mapbox.api.directions.v5.models.BannerInstructions;
import com.mapbox.api.directions.v5.models.DirectionsResponse;
import com.mapbox.api.directions.v5.models.DirectionsRoute;
import com.mapbox.geojson.Point;
import com.mapbox.mapboxsdk.Mapbox;
import com.mapbox.mapboxsdk.camera.CameraPosition;
import com.mapbox.mapboxsdk.geometry.LatLng;
import com.mapbox.services.android.navigation.ui.v5.NavigationView;
import com.mapbox.services.android.navigation.ui.v5.NavigationViewOptions;
import com.mapbox.services.android.navigation.ui.v5.OnNavigationReadyCallback;
import com.mapbox.services.android.navigation.ui.v5.listeners.BannerInstructionsListener;
import com.mapbox.services.android.navigation.ui.v5.listeners.InstructionListListener;
import com.mapbox.services.android.navigation.ui.v5.listeners.NavigationListener;
import com.mapbox.services.android.navigation.ui.v5.listeners.SpeechAnnouncementListener;
import com.mapbox.services.android.navigation.ui.v5.voice.SpeechAnnouncement;
import com.mapbox.services.android.navigation.v5.navigation.NavigationRoute;
import com.mapbox.services.android.navigation.v5.routeprogress.ProgressChangeListener;
import com.mapbox.services.android.navigation.v5.routeprogress.RouteProgress;
import okhttp3.OkHttpClient;
import retrofit2.Call;
import retrofit2.Response;
import com.pubnub.api.PNConfiguration;
import com.pubnub.api.PubNub;
import com.pubnub.api.callbacks.PNCallback;

import com.pubnub.api.*;
import com.pubnub.api.callbacks.SubscribeCallback;
import com.pubnub.api.models.consumer.PNPublishResult;
import com.pubnub.api.models.consumer.PNStatus;
import com.pubnub.api.models.consumer.presence.PNSetStateResult;
import com.pubnub.api.models.consumer.pubsub.PNMessageResult;
import com.pubnub.api.models.consumer.pubsub.PNPresenceEventResult;
import org.jetbrains.annotations.NotNull;
import java.util.Arrays;


public class MapaScreen extends AppCompatActivity implements OnNavigationReadyCallback,
        NavigationListener, ProgressChangeListener, InstructionListListener, SpeechAnnouncementListener,
        BannerInstructionsListener {

    private Point ORIGIN;
    private Point ORIGIN2;
    private static final double DistanciaMin = 6;
    private static final int INITIAL_ZOOM = 16;
    private NavigationView navigationView;
    private View spacer;
    private TextView speedWidget;
    private boolean bottomSheetVisible = true;
    private boolean instructionListShown = false;
    String channelName = "";
    PNConfiguration pnConfiguration=new PNConfiguration();
    PubNub pubnub;
    String Titulo = "";
    String ModeDrive = "";
    String KeyMapbox = "pk.eyJ1IjoiYWx5MjMyNCIsImEiOiJjazJnZ2xsZDIwYThqM2xwYW5xNHA5bHRxIn0.eFxM9e0vNpVoDUbhBI-hOw";
    String nombreuser = "";
    ApolloClient apolloClient;
    int idtravel = 0;
    int statusviaje = 0;
    TextView txttitulo;

    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        String BASE_URL = "https://backend-alyskiper.herokuapp.com/graphql";
        OkHttpClient okHttpClient = new OkHttpClient.Builder().build();
        apolloClient = ApolloClient.builder().serverUrl(BASE_URL).okHttpClient(okHttpClient).build();
        Intent intent = getIntent();
        float LatO, LonO;
        LatO = intent.getFloatExtra("LatitudOrigen", 0);
        LonO = intent.getFloatExtra("LongitudOrigen", 0);
        ORIGIN = Point.fromLngLat(LonO, LatO);
        float Lat1, Lon1;
        Lat1 = intent.getFloatExtra("LatitudDest", 0);
        Lon1 = intent.getFloatExtra("LongitudDest", 0);
        Titulo = intent.getStringExtra("titulo");
        //KeyMapbox = intent.getStringExtra("keymapbox");
        ModeDrive = intent.getStringExtra("modedrive");
        nombreuser = intent.getStringExtra("nombreuser");
        idtravel = intent.getIntExtra("IdTravel", 0);
        statusviaje = intent.getIntExtra("statusviaje", 0);
        ORIGIN2 = Point.fromLngLat( Lon1,Lat1);
        Mapbox.getInstance(this ,KeyMapbox);
        setContentView(R.layout.activity_mapa_screen);
        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        navigationView = findViewById(R.id.navigationView);
        txttitulo = findViewById(R.id.txtTitulo);
        txttitulo.setText(Titulo);
        navigationView.onCreate(savedInstanceState);
        initPunhub();
        initNightMode();
    }

    public void initPunhub(){
        pnConfiguration.setSubscribeKey("sub-c-e286360e-fdc3-11e9-be22-ea7c5aada356");
        pnConfiguration.setPublishKey("pub-c-b5350d6e-9a1f-4d33-b5c9-918fe9bff121");
        pnConfiguration.setUuid(nombreuser);
        pnConfiguration.setSecure(false);
        pubnub = new PubNub(pnConfiguration);
        channelName = "Driver_" +  Integer.toString(idtravel);
        pubnub.addListener(new SubscribeCallback() {
            @Override
            public void status(PubNub pubnub, PNStatus status) {
                switch (status.getOperation()) {
                    case PNSubscribeOperation:
                    case PNUnsubscribeOperation:
                        switch (status.getCategory()) {
                            case PNConnectedCategory:
                                final JsonObject messageJsonObject = new JsonObject();
                                pubnub.setPresenceState()
                                .channels(Arrays.asList(channelName)) // apply on those channel groups
                                .state(messageJsonObject) // the new state
                                .async(new PNCallback<PNSetStateResult>() {
                                    @Override
                                    public void onResponse(PNSetStateResult result, PNStatus status) {
                                        if(status != null)
                                            Log.d("Resultadosetpresence1:", status.toString());
                                        if(result != null)
                                            Log.d("Resultadosetpresence1:", result.toString());
                                    }
                                });
                                // this is expected for a subscribe, this means there is no error or issue whatsoever
                            case PNReconnectedCategory:
                                // this usually occurs if subscribe temporarily fails but reconnects. This means
                                // there was an error but there is no longer any issue
                            case PNDisconnectedCategory:
                                // this is the expected category for an unsubscribe. This means there
                                // was no error in unsubscribing from everything
                            case PNUnexpectedDisconnectCategory:
                                // this is usually an issue with the internet connection, this is an error, handle appropriately
                            case PNAccessDeniedCategory:
                                // this means that PAM does allow this client to subscribe to this
                                // channel and channel group configuration. This is another explicit error
                            default:
                                // More errors can be directly specified by creating explicit cases for other
                                // error categories of `PNStatusCategory` such as `PNTimeoutCategory` or `PNMalformedFilterExpressionCategory` or `PNDecryptionErrorCategory`
                        }

                    case PNHeartbeatOperation:
                        // heartbeat operations can in fact have errors, so it is important to check first for an error.
                        // For more information on how to configure heartbeat notifications through the status
                        // PNObjectEventListener callback, consult <link to the PNCONFIGURATION heartbeart config>
                        if (status.isError()) {
                            // There was an error with the heartbeat operation, handle here
                        } else {
                            // heartbeat operation was successful
                        }
                    default: {
                        // Encountered unknown status type
                    }
                }
            }

            @Override
            public void message(PubNub pubnub, PNMessageResult message) {
                String messagePublisher = message.getPublisher();
                System.out.println("Message publisher: " + messagePublisher);
                System.out.println("Message Payload: " + message.getMessage());
                System.out.println("Message Subscription: " + message.getSubscription());
                System.out.println("Message Channel: " + message.getChannel());
                System.out.println("Message timetoken: " + message.getTimetoken());
            }
            @Override
            public void presence(PubNub pubnub2, PNPresenceEventResult presence) {
                Log.d("Resultado:", presence.toString());
            }
        });
        pubnub.subscribe().channels(Arrays.asList(channelName)).withPresence().execute();
        CameraPosition initialPosition = new CameraPosition.Builder()
        .target(new LatLng(ORIGIN.latitude(), ORIGIN.longitude()))
        .zoom(INITIAL_ZOOM)
        .build();
        navigationView.initialize(this, initialPosition);
    }

    @Override
    public void onNavigationReady(boolean isRunning) {
        fetchRoute();
    }

    @Override
    public void onStart() {
        super.onStart();
        navigationView.onStart();
    }

    @Override
    public void onResume() {
        super.onResume();
        navigationView.onResume();
    }

    @Override
    public void onLowMemory() {
        super.onLowMemory();
        navigationView.onLowMemory();
    }

    @Override
    public void onBackPressed() {
        // If the navigation view didn't need to do anything, call super
        if (!navigationView.onBackPressed()) {
            super.onBackPressed();
        }
    }

    @Override
    protected void onSaveInstanceState(Bundle outState) {
        navigationView.onSaveInstanceState(outState);
        super.onSaveInstanceState(outState);
    }

    @Override
    protected void onRestoreInstanceState(Bundle savedInstanceState) {
        super.onRestoreInstanceState(savedInstanceState);
        navigationView.onRestoreInstanceState(savedInstanceState);
    }

    @Override
    public void onPause() {
        super.onPause();
        navigationView.onPause();
    }

    @Override
    public void onStop() {
        super.onStop();
        navigationView.onStop();
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        navigationView.onDestroy();
        if (isFinishing()) {
            saveNightModeToPreferences(AppCompatDelegate.MODE_NIGHT_AUTO);

        }
    }

    @Override
    public void onCancelNavigation() {
        // Navigation canceled, finish the activity
      // Toast toast= Toast.makeText(getApplicationContext(),datos,Toast.LENGTH_SHORT);
        //toast.setMargin(50,50);
        //toast.show();
        navigationView.stopNavigation();
        pubnub.unsubscribeAll();
        finish();

    }

    @Override
    public void onNavigationFinished() {
        // Intentionally empty
        pubnub.unsubscribeAll();
        finish();
    }

    @Override
    public void onNavigationRunning() {
        // Intentionally empty

    }


    @Override
    public void onProgressChange(Location location, RouteProgress routeProgress) {
     
        String s = routeProgress.currentState().name();
        double as = routeProgress.distanceRemaining();
   

        if(s != null){
           try{
             final JsonObject coordenadas = new JsonObject();
             coordenadas.addProperty("latitude",location.getLatitude());
             coordenadas.addProperty("longitude",location.getLongitude());
             final JsonObject messageJsonObject = new JsonObject();
             messageJsonObject.add("coords", coordenadas);
             Log.d("UpdateLocalizacion:","");
             pubnub.setPresenceState()
             .channels(Arrays.asList(channelName)) // apply on those channel groups
             .state(messageJsonObject) // the new state
             .async(new PNCallback<PNSetStateResult>() {
                 @Override
                 public void onResponse(PNSetStateResult result, PNStatus status) {
                 Log.d("UpdateLocalizacion:", status.toString());
                 Log.d("UpdateLocalizacion:", result.toString());
                 }
             });

           }
            catch (Exception ex)
            {
                Toast.makeText(getApplicationContext(),ex.getMessage(),Toast.LENGTH_SHORT);
            }

        

        if((s.equals("ROUTE_ARRIVED") || as <= DistanciaMin ) && statusviaje == 3)
        {
            try{
                ModificarViajeMutation modificarviaje = ModificarViajeMutation.builder()
                .lat(location.getLatitude())
                .lng(location.getLongitude())
                .idtravelstatus("ESPERANDOCONFIRMACION")
                .idtravel(idtravel)
                .build();

                apolloClient
                .mutate(modificarviaje)
                .enqueue(
                        new ApolloCall.Callback<ModificarViajeMutation.Data>() {
                            @Override
                            public void onResponse(com.apollographql.apollo.api.@NotNull Response<ModificarViajeMutation.Data> response) {
                                Log.d("mutation response", response.toString());
                                statusviaje = 4;
                            }

                            @Override
                            public void onFailure(@NotNull ApolloException e) {
                                Log.d("mutation error", e.toString());
                            }
                        }
                );
            }
            catch (Exception ex)
            {
                Toast.makeText(getApplicationContext(),ex.getMessage(),Toast.LENGTH_SHORT);
            }
        }
       }

    }

    @Override
    public void onInstructionListVisibilityChanged(boolean shown) {
        instructionListShown = shown;
     //   speedWidget.setVisibility(shown ? View.GONE : View.VISIBLE);
        if (instructionListShown) {

        } else if (bottomSheetVisible) {

        }
    }

    @Override
    public SpeechAnnouncement willVoice(SpeechAnnouncement announcement) {
       // return SpeechAnnouncement.builder().announcement("").build();
       return SpeechAnnouncement.builder().announcement(announcement.announcement()).build();
    }

    @Override
    public BannerInstructions willDisplay(BannerInstructions instructions) {
        return instructions;
    }

    private void startNavigation(DirectionsRoute directionsRoute) {
        NavigationViewOptions.Builder options =
        NavigationViewOptions.builder()
        .navigationListener(this)
        .directionsRoute(directionsRoute)
        .shouldSimulateRoute(false)
        .progressChangeListener(this)
        .instructionListListener(this)
        .speechAnnouncementListener(this)
        .bannerInstructionsListener(this);
        setBottomSheetCallback(options);
        setupNightModeFab();
        navigationView.startNavigation(options.build());
    }

    private void fetchRoute() {
        NavigationRoute.builder(this)
        .accessToken(KeyMapbox)
        .origin(ORIGIN)
        .destination(ORIGIN2)
        .alternatives(true)
        .profile(ModeDrive)
        .build()
        .getRoute(new SimplifiedCallback() {
            @Override
            public void onResponse(Call<DirectionsResponse> call, Response<DirectionsResponse> response) {
                try {
                    DirectionsRoute directionsRoute = response.body().routes().get(0);
                    startNavigation(directionsRoute);
                } catch(OutOfMemoryError e1) {

                }
            }


        });
    }

    /**
     * Sets the anchor of the spacer for the speed widget, thus setting the anchor for the speed widget
     * (The speed widget is anchored to the spacer, which is there because padding between items and
     * their anchors in CoordinatorLayouts is finicky.
     *
     * @param res resource for view of which to anchor the spacer
     */
    private void setSpeedWidgetAnchor(@IdRes int res) {
        CoordinatorLayout.LayoutParams layoutParams = (CoordinatorLayout.LayoutParams) spacer.getLayoutParams();
        layoutParams.setAnchorId(res);
      //  spacer.setLayoutParams(layoutParams);
    }

    private void setBottomSheetCallback(NavigationViewOptions.Builder options) {
        options.bottomSheetCallback(new BottomSheetBehavior.BottomSheetCallback() {
            @Override
            public void onStateChanged(@NonNull View bottomSheet, int newState) {
                switch (newState) {
                    case BottomSheetBehavior.STATE_HIDDEN:
                        bottomSheetVisible = false;
                      //  setSpeedWidgetAnchor(R.id.recenterBtn);
                        break;
                    case BottomSheetBehavior.STATE_EXPANDED:
                        bottomSheetVisible = true;
                        break;
                    case BottomSheetBehavior.STATE_SETTLING:
                        if (!bottomSheetVisible) {
                            // View needs to be anchored to the bottom sheet before it is finished expanding
                            // because of the animation

                        //    setSpeedWidgetAnchor(R.id.summaryBottomSheet);
                        }
                        break;
                    default:
                        return;
                }
            }

            @Override
            public void onSlide(@NonNull View bottomSheet, float slideOffset) {
            }
        });
    }

    private void setupNightModeFab() {
        //  fabNightModeToggle.setOnClickListener(view -> toggleNightMode());
    }

    private void toggleNightMode() {
        int currentNightMode = getCurrentNightMode();
        alternateNightMode(currentNightMode);
    }

    private void initNightMode() {
        int nightMode = retrieveNightModeFromPreferences();
        AppCompatDelegate.setDefaultNightMode(nightMode);
    }

    private int getCurrentNightMode() {
        return getResources().getConfiguration().uiMode
                & Configuration.UI_MODE_NIGHT_MASK;
    }

    private void alternateNightMode(int currentNightMode) {
        int newNightMode;
        if (currentNightMode == Configuration.UI_MODE_NIGHT_YES) {
            newNightMode = AppCompatDelegate.MODE_NIGHT_NO;
        } else {
            newNightMode = AppCompatDelegate.MODE_NIGHT_YES;
        }
        saveNightModeToPreferences(newNightMode);
        recreate();
    }

    private int retrieveNightModeFromPreferences() {
        SharedPreferences preferences = PreferenceManager.getDefaultSharedPreferences(this);
        return preferences.getInt(getString(R.string.current_night_mode), AppCompatDelegate.MODE_NIGHT_AUTO);
    }

    private void saveNightModeToPreferences(int nightMode) {
        SharedPreferences preferences = PreferenceManager.getDefaultSharedPreferences(this);
        SharedPreferences.Editor editor = preferences.edit();
        editor.putInt(getString(R.string.current_night_mode), nightMode);
        editor.apply();
    }

    private void setSpeed(Location location) {
        String string = String.format("%d\nMPH", (int) (location.getSpeed() * 2.2369));
        int mphTextSize = getResources().getDimensionPixelSize(R.dimen.mph_text_size);
        int speedTextSize = getResources().getDimensionPixelSize(R.dimen.speed_text_size);

        SpannableString spannableString = new SpannableString(string);
        spannableString.setSpan(new AbsoluteSizeSpan(mphTextSize),
                string.length() - 4, string.length(), Spanned.SPAN_INCLUSIVE_INCLUSIVE);

        spannableString.setSpan(new AbsoluteSizeSpan(speedTextSize),
                0, string.length() - 3, Spanned.SPAN_INCLUSIVE_INCLUSIVE);

        speedWidget.setText(spannableString);
        if (!instructionListShown) {
            speedWidget.setVisibility(View.VISIBLE);
        }
    }

}
